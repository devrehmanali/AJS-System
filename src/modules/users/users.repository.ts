import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import { User, UserDocument } from './schemas/users.schema';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UsersRepository {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
    ) { }

    async createUser(user: CreateUserDto): Promise<any> {
        user.user_id = uuidv4();
        return await this.userModel.create(user);
    }

    async updateUser(criteria: object, data: object): Promise<any> {
        return this.userModel.updateOne(criteria, data);
    }

    async updateByEmail(criteria: { email: string }, data: any): Promise<any> {
        return this.userModel.updateOne(criteria, data);
    }

    async findUserByEmailAndLoggedIn(email: string): Promise<User | null> {
        return this.userModel.findOne({
            email,
            isLoggedIn: true,
        });
    }

    async findUserByEmail(email: string): Promise<User | null> {
        return this.userModel.findOne({
            email,
        });
    }

    async findUserByConnectAccountId(connectAccountId: string): Promise<User | null> {
        return this.userModel.findOne({
            stripe_link_account_id: connectAccountId,
        });
    }

    async findCoachList(email: string): Promise<User[] | null> {
        return this.userModel.find({
            role: { $in: "coach" },
            email: { $ne: email }
        });
    }

    async findAllUsersList(page: string, limit: string): Promise<any> {
        const pageInInt = parseInt(page, 10) || 0
        const limitInInt = parseInt(limit, 10) || 10
        return this.userModel.find().sort({ createdAt: 'desc' }).limit(limitInInt).skip(limitInInt * pageInInt);
    }

    async findUserByUserId(user_id: any): Promise<User | null> {
        return this.userModel.findOne({ user_id: user_id });
    }

    async findLastByUserId(): Promise<any | null> {
        return this.userModel.aggregate([
            {
                $sort: {
                    user_id: -1,
                },
            },
            { $limit: 1 },
        ]);
    }

    async createConnectAccount(email: string): Promise<User | null> {
        const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

        const account = await stripe.accounts.create({
            type: 'custom',
            country: 'US',
            email: 'wellavi.dev@gmail.com',
            capabilities: {
                card_payments: { requested: true },
                transfers: { requested: true },
            },
        });

        // TODO for create link
        const accountLink = await stripe.accountLinks.create({
            account: account.id,
            refresh_url:
                `${process.env.BASE_URL_FRONT_END}/login`, // Todo
            return_url:
                `${process.env.BASE_URL_FRONT_END}/login`, // Todo
            type: 'account_onboarding',
        });
        accountLink.account_id = account.id;

        return accountLink;
    }
}
