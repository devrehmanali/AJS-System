import { Injectable } from '@nestjs/common';
import {ERROR} from '@/constants/constants';
import {UsersService} from '@users/users.service';
import axios from 'axios';
import {
    ALL_SESSIONS_NYLAS,
    AVAILABILITIES,
    CREATE_Session_NYLAS, GROUP_SESSION, ONE_ON_ONE_SESSION, PRE_RECORDED_SESSION,
    UPDATE_Session_NYLAS,
    WEBINAR_SESSION
} from '@/constants/nylasApis';
import {CreateNylasSessionDto} from '@/modules/nylas/dto/create-nylas-session.dto';
import {SessionsService} from '@/modules/sessions/sessions.service';
import {UpdateNylasSessionDto} from '@/modules/nylas/dto/update-nylas-session.dto';
import {AvailabilitiesDto} from '@/modules/nylas/dto/availabilities.dto';
import moment from 'moment';

@Injectable()
export class NylasService {
    constructor(private readonly usersService: UsersService,
                private readonly sessionsService: SessionsService) {}

    async createNylasSessions(data: CreateNylasSessionDto): Promise<any> {
        const coachId = data.coach_id;

        const coachData = await this.usersService.findUserByUserId(coachId);

        const coachNylasCalendarId = coachData?.nylasCalendarId
        const coachNylasAccessToken = coachData?.nylasAccessToken
        const coachCustomerConnectAccountId = coachData?.stripe_link_account_id

        if (!coachNylasCalendarId) {
            return false;
        }

        data.calendar_id = coachNylasCalendarId

        // call api for create session on Nylas
        const nylasResponse = await this.nylasCreateApi(data, coachNylasAccessToken)

        //store event in our DB after created on nylas
        if (nylasResponse != ERROR) {
            const userId = data.user_id

            const sessionData = {
                    user_id: userId,
                    coach_id: coachId,
                    customer_connect_account_id: coachCustomerConnectAccountId,
                    created_by: data.created_by,
                    price: data.price,
                    duration: data.duration,
                    date: data.date,
                    time: data.time,
                    scope: 'no scope',
                    type: data.session_type,
                    options: {
                        nylasSessionRes: nylasResponse.data,
                        groupsRes: {
                            hasJoined: false,
                            membersCount: 1,
                            guid: nylasResponse.data.id,
                            name: 'One on One0',
                            type: data.session_type,
                            scope: 'admin',
                            conversationId: `group_${nylasResponse.data.id}`,
                            owner: 'owner',
                            joinedAt: 4387,
                            createdAt: 4387
                        }
                    }
            }
            return await this.sessionsService.storeSessionsAfterNylas(sessionData)
        } else {
            return false;
        }
    }

    async updateNylasSessions(id: string, data: UpdateNylasSessionDto): Promise<any> {
        const filter = {
            'options.nylasSessionRes.id': id
        }
        //this is for update event on nylas server
        //fetch session data against session id
        const sessionData = await this.sessionsService.fetchSessionByFilter(filter);

        if (sessionData) {
            //coach connect account id for get coach nylas access token
            const coachConnectAccountId = sessionData.customer_connect_account_id

            //fetch coach data against connect account id
            const coachData = await this.usersService.findUserByConnectAccountId(coachConnectAccountId);
            const coachNylasAccessToken = coachData?.nylasAccessToken

            // call api for create session on Nylas
            const nylasResponse = await this.nylasUpdateApi(id, data, coachNylasAccessToken)
            // store event in our DB after created on nylas
            if (nylasResponse != ERROR) {
                const sessionData = {
                    price: 0,
                    duration: data.duration,
                    date: data.date,
                    time: data.time,
                    scope: 'no scope',
                    type: data.session_type,
                    options: {
                        nylasSessionRes: nylasResponse.data
                    }
                }
                return await this.sessionsService.updateSessionAfterNylas(filter, sessionData)
            } else {
                return ERROR;
            }
        } else {return false}
    }

    async fetchNylasAllSessions(email: string): Promise<any> {
        const coachData = await this.usersService.findUserByEmail(email);

        const coachNylasAccessToken = coachData?.nylasAccessToken
        if (!coachNylasAccessToken) {
            return false
        }
        return await axios.get(
            `${ALL_SESSIONS_NYLAS}?metadata_value=${WEBINAR_SESSION}&metadata_value=${ONE_ON_ONE_SESSION}&metadata_value=${PRE_RECORDED_SESSION}&metadata_value=${GROUP_SESSION}`,
            {
                headers: {
                    Authorization: `Bearer ${coachNylasAccessToken}`
                }
            }
        );
    }

    async getAvailabilities(email: string, data: AvailabilitiesDto): Promise<any> {
        const coachData = await this.usersService.findUserByEmail(email);

        const coachNylasAccessToken = coachData?.nylasAccessToken

        if (!coachNylasAccessToken) {
            return false
        }

        return await axios.post(
            AVAILABILITIES,
            data,
            {
                headers: {
                    Authorization: `Bearer ${coachNylasAccessToken}`
                }
            }
        );
    }

    async nylasCreateApi(eventData: object, coachNylasAccessToken: any) {
        try{
            return await axios.post(
                CREATE_Session_NYLAS,
                eventData,
                {
                    headers: {
                        Authorization: `Bearer ${coachNylasAccessToken}`
                    }
                })
        } catch (error) {
            return ERROR
        }
    }

    async nylasUpdateApi(eventId: string, eventData: object, coachNylasAccessToken: any) {
        try{
            return  await axios.put(UPDATE_Session_NYLAS + eventId,
                eventData,
                {
                    headers: {
                        Authorization: `Bearer ${coachNylasAccessToken}`
                    }
                });
        } catch (error) {
            return ERROR
        }
    }

}
