import {Injectable} from '@nestjs/common';
import {CreateUserDto} from './dto/create-user.dto';
import {User} from './schemas/users.schema';
import {UsersRepository} from './users.repository';
import {StripeService} from "@/modules/stripe/stripe.service";
import {UploadsService} from '@/modules/uploads/uploads.service';
import {PERSONAL_INFORMATION, TRUE_SELF_INCOMPLETE} from '@/constants/rabbitMqEvents';
import {RabbitMqService} from '@/modules/rabbit-mq/rabbit-mq.service';
import {APPROVED, REJECTED} from '@/constants/coachStatusConstants';
import axios from 'axios';
import {AnswersService} from '@/modules/answers/answers.service';
import {ASSET, COACH, COACH_WALLET, USER_WALLET} from '@/constants/constants';
import {AnswersRepository} from '@/modules/answers/answers.repository';
import {WalletAccountsService} from '@/modules/wallet-accounts/wallet-accounts.service';

import {api} from '@/helpers/ghost.helper'


@Injectable()
export class UsersService {
    constructor(private readonly usersRepository: UsersRepository,
                private readonly uploadsService: UploadsService,
                private readonly rabbitMqService: RabbitMqService,
                private readonly answersRepository: AnswersRepository,
                private readonly walletAccountsService: WalletAccountsService
    ) {
    }

    async createUser(user: CreateUserDto): Promise<User> {
        return await this.usersRepository.createUser(user);
    }

    async updateUser(criteria: object, data: any, req = null, extraDataForGhost?: any): Promise<any> {
        // @ts-ignore
        const user = await this.usersRepository.findUserByEmail(req?.user?.email);
        const email = user?.email;
        const first_name = user?.first_name;
        const last_name = user?.last_name
        //Check if user register as a coach and then create its connect account and link that account to generate URL
        //also check if user register as a user then create its nylas account if user will register as a coach then it will not create at this moment
        if (data.role && data.role.includes('coach')) {
            // @ts-ignore
            const connectAccount = await this.usersRepository.createConnectAccount(req.user.email);
            // @ts-ignore
            data.stripe_link_account_url = connectAccount?.url
            // @ts-ignore
            data.stripe_link_account_id = connectAccount?.account_id
        } else {
            if (user?.nylasAccountId === 'false') {
                // Creating Nylas Calendar
                let authorizeNylas = await axios.post(
                    'https://api.nylas.com/connect/authorize',
                    {
                        client_id: process.env.NYLAS_CLIENT_ID,
                        provider: 'nylas',
                        scopes: 'calendar',
                        // @ts-ignore
                        email: email,
                        // @ts-ignore
                        name: first_name + ' ' + last_name,
                        settings: {},
                    },
                );

                if (data.role && data.role.includes('user')) {
                    // Create member on Ghost
                    await api.members.add({
                        email: extraDataForGhost.email,
                        name: `${extraDataForGhost.first_name || ''} ${
                            extraDataForGhost.last_name || ''
                        }`,
                    });

                }

                // @ts-ignore
                const user = await this.usersRepository.findUserByEmail(req?.user?.email);
                let connectNylas = await axios.post(
                    'https://api.nylas.com/connect/token',
                    {
                        client_id: process.env.NYLAS_CLIENT_ID,
                        client_secret: process.env.NYLAS_CLIENT_SECRET,
                        code: authorizeNylas.data?.code,
                    },
                );

                let calendar = await axios.post(
                    'https://api.nylas.com/calendars',
                    {
                        name: user?.first_name + "'s Calendar",
                        description: '',
                        location: '',
                        timezone: 'UTC',
                        metadata: {},
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${connectNylas?.data?.access_token}`,
                        },
                    },
                );
                data.nylasAccountId = connectNylas.data.account_id
                data.nylasAccessToken = connectNylas.data.access_token
                data.nylasCalendarId = calendar.data.id
            }
        }

        //check if user update their role then check and create wallet of that user
        if (data.role && data.role.includes('coach')) {
            await this.walletAccountsService.findOneAndUpdate({
                user_id: user?.user_id,
                name: COACH_WALLET
            }, {user_id: user?.user_id, name: COACH_WALLET, type: ASSET, wallet: 0})
            await this.walletAccountsService.findOneAndUpdate({
                user_id: user?.user_id,
                name: USER_WALLET
            }, {user_id: user?.user_id, name: USER_WALLET, type: ASSET, wallet: 0})
        } else if (data.role && data.role.includes('user')) {
            await this.walletAccountsService.findOneAndUpdate({
                user_id: user?.user_id,
                name: USER_WALLET
            }, {user_id: user?.user_id, name: USER_WALLET, type: ASSET, wallet: 0})
        }

        if (data.avatar) {
            const extension = data.avatar.split(';')[0].split('/')[1]
            const fileName = user?.user_id + '-avatar.' + extension;
            const image = data.avatar;
            const uploadedImageResponse = await this.uploadsService.uploadFileBase64(image, fileName)
            data.avatar = uploadedImageResponse.Location
        }

        if (data.cover_image) {
            const extension = data.cover_image.split(';')[0].split('/')[1]
            const fileName = user?.user_id + '-cover-image.' + extension;
            const image = data.cover_image;
            const uploadedImageResponse = await this.uploadsService.uploadFileBase64(image, fileName)
            data.cover_image = uploadedImageResponse.Location
        }

        //add event into rabbitMQ Queue
        // @ts-ignore
        await this.rabbitMqService.eventEmitterOnRabbitMQ(PERSONAL_INFORMATION, {user_id: user.user_id});

        return this.usersRepository.updateUser(criteria, data);
    }

    async updateByEmail(email: string, data: any): Promise<any> {
        return this.usersRepository.updateByEmail({email}, data);
    }

    async createOrUpdateDeviceId(email: string, data: any): Promise<any> {
        const userData = await this.usersRepository.findUserByEmail(email);
        const storingData = {
            user_id: userData?.user_id,
            device_id: data.device_id
        }
        return this.usersRepository.findOneAndUpdate(data, storingData, {
            new: true,
            upsert: true // Make this update into an upsert
        });
    }

    async updateCoachStatusByEmail(data: any): Promise<any> {
        const result = await this.usersRepository.updateUser({user_id: data.user_id}, {coach_status: data.coach_status});
        //if status id approved then we will create coach account on nylas
        if (data.coach_status === APPROVED) {
            const user = await this.usersRepository.findUserByUserId(data.user_id);
            if (user?.nylasAccountId === 'false') {
                // Creating Nylas Calendar
                let authorizeNylas = await axios.post(
                    'https://api.nylas.com/connect/authorize',
                    {
                        client_id: process.env.NYLAS_CLIENT_ID,
                        provider: 'nylas',
                        scopes: 'calendar',
                        email: user?.email,
                        name: user?.first_name + ' ' + user?.last_name,
                        settings: {},
                    },
                );

                let connectNylas = await axios.post(
                    'https://api.nylas.com/connect/token',
                    {
                        client_id: process.env.NYLAS_CLIENT_ID,
                        client_secret: process.env.NYLAS_CLIENT_SECRET,
                        code: authorizeNylas.data?.code,
                    },
                );

                let calendar = await axios.post(
                    'https://api.nylas.com/calendars',
                    {
                        name: user?.first_name + "'s Calendar",
                        description: '',
                        location: '',
                        timezone: 'UTC',
                        metadata: {},
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${connectNylas?.data?.access_token}`,
                        },
                    },
                );
                //update nylas data in users
                const nylasData = {
                    nylasAccountId: connectNylas.data.account_id,
                    nylasAccessToken: connectNylas.data.access_token,
                    nylasCalendarId: calendar.data.id,
                    is_coach_approved: true
                }
                await this.usersRepository.updateUser({user_id: data.user_id}, nylasData);
            }
        }
        //if status is rejected then we will delete assessment of this user
        if (data.coach_status === REJECTED) {
            const user = await this.usersRepository.findUserByUserId(data.user_id);
            const coachRejection = await this.usersRepository.createRejectionReasoning({
                user_id: data.user_id,
                reasoning_id: data.reason_id
            });
            const deleteAnswers = await this.answersRepository.deleteAnswers({user_id: data.user_id, role: COACH});
        }
        return result
    }

    async findUserByEmailAndLoggedIn(email: string): Promise<User | null> {
        return this.usersRepository.findUserByEmailAndLoggedIn(email);
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return await this.usersRepository.findUserByEmail(email);
    }

    async findUserByConnectAccountId(connectAccountId: string): Promise<User | null> {
        return await this.usersRepository.findUserByConnectAccountId(connectAccountId);
    }

    async fetchAllCoaches(email: string): Promise<User[] | null> {
        return await this.usersRepository.findCoachList(email);
    }

    async fetchAllUsers(page: string, limit: string): Promise<any> {
        return await this.usersRepository.findAllUsersList(page, limit);
    }

    async findUserByUserId(user_id: any): Promise<User | null> {
        return this.usersRepository.findUserByUserId(user_id);
    }
}
