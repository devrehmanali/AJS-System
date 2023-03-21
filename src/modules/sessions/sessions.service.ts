import { Injectable } from '@nestjs/common';
import {User} from '@users/schemas/users.schema';
import {SessionsRepository} from '@/modules/sessions/sessions.repository';
import {UsersService} from '@users/users.service';
import {StripeRepository} from '@/modules/stripe/stripe.repository';
import {FeedbackDto} from '@/modules/stripe/dto/feedback.dto';
import {getDateDifference, getMonthName} from '@helpers/general.helper';
import axios from 'axios';
import {CreateSessionDto} from '@/modules/sessions/dto/create-session.dto';
import {UPDATE_Session_NYLAS} from '@/constants/nylasApis';
import {
    COACHING_SESSION_REVENUE_WALLET, CREDIT,
    DEBIT, ESCROW_ACCOUNT_WALLET,
    STRIPE_SUBSCRIPTION_FEE_WALLET,
    USER_WALLET, WELLAVI_CASH_WALLET
} from '@/constants/constants';
import {WalletAccountsService} from '@/modules/wallet-accounts/wallet-accounts.service';
import {LedgerService} from '@/modules/ledger/ledger.service';
const { Types: { ObjectId: ObjectId } } = require("mongoose");

@Injectable()
export class SessionsService {
    constructor(private readonly stripeRepository: StripeRepository,
                private readonly usersService: UsersService,
                private readonly walletAccountsService: WalletAccountsService,
                private readonly ledgerService: LedgerService
    ) {}

    async fetchSessionsWithFilters(email: string, filter: string, role: string, sort: any): Promise<any> {

        const userData = await this.usersService.findUserByEmail(email);
        const customerConnectAccountId = userData?.stripe_link_account_id
        const userId = userData?.user_id
        // if (!customerConnectAccountId) {
        //     return null;
        // }

        //if frontend will send me PAST status then I will send all previous sessions from current date
        //else I will send according to session
        if (filter === 'PAST') {
            return await this.stripeRepository.findPastSessions(customerConnectAccountId, filter, userId, role, sort);
        } else {
            return await this.stripeRepository.findSessions(customerConnectAccountId, filter, userId, role, sort);
        }

    }

    async fetchSessionsRequests(email: string, filter: string, role: string): Promise<any> {

        const userData = await this.usersService.findUserByEmail(email);
        const customerConnectAccountId = userData?.stripe_link_account_id
        const userId = userData?.user_id
        // if (!customerConnectAccountId) {
        //     return null;
        // }
            return await this.stripeRepository.findSessionsRequest(customerConnectAccountId, filter, userId, role);
    }

    async fetchSessionById(id: string): Promise<any> {
        return await this.stripeRepository.findSessionByIdWithUser(ObjectId(id));
    }

    async fetchUpcomingSessions(email: string, role: string): Promise<any> {

        const userData = await this.usersService.findUserByEmail(email);
        const customerConnectAccountId = userData?.stripe_link_account_id
        const userId = userData?.user_id
        if (!customerConnectAccountId) {
            return null;
        }
        return await this.stripeRepository.findUpcomingSessions(customerConnectAccountId, userId, role);
    }

    // async storeUserFeedback(email: string, data: FeedbackDto, sessionId: string): Promise<any> {
    //     const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
    //     const { Types: {ObjectId: ObjectId} } = require("mongoose");
    //
    //     //filtered data to store in DB
    //     const storingData = {
    //         user_feedback: data.feedback,
    //         is_active: 'APPROVED',
    //         connect_transfer_id: ''
    //     }
    //
    //     // find pending sessions against user
    //     const userSession = await this.stripeRepository.findApprovedSessions(ObjectId(sessionId));
    //     if (userSession) {
    //         if(userSession.coach_feedback) {
    //             //Calculating percentage of application fee
    //             // @ts-ignore
    //             const applicationFee = (userSession.price * process.env.STRIPE_APPLICATION_FEE) / 100
    //
    //             //After create payment intent we need to confirm it
    //             const paymentIntentConfirm = await stripe.paymentIntents.confirm(
    //                 userSession.payment_intent_id,
    //                 { payment_method: 'pm_card_visa' }
    //             );
    //             // Create a Transfer to the connected account (later):
    //             const transfer = await stripe.transfers.create({
    //                 amount: userSession.price,
    //                 currency: 'usd',
    //                 destination: userSession.customer_connect_account_id,
    //             });
    //             //filtered data to store in DB
    //             storingData.connect_transfer_id = transfer.id;
    //             storingData.is_active= 'COMPLETED';
    //         }
    //
    //         const filter = {
    //             _id: ObjectId(userSession._id)
    //         }
    //
    //         const storeInDB = await this.stripeRepository.updateSession(filter, storingData);
    //
    //         //store data in database
    //
    //         return storeInDB
    //     } else {
    //         return null;
    //     }
    // }

    async fetchUserFeedback(email: string): Promise<any> {
        const userData = await this.usersService.findUserByEmail(email);
        const customerConnectAccountId = userData?.stripe_link_account_id
        if (!customerConnectAccountId) {
            return null;
        }

        return  await this.stripeRepository.findUsersFeedback(customerConnectAccountId);
    }

    async fetchUsersPendingFeedback(email: string): Promise<any> {
        const userData = await this.usersService.findUserByEmail(email);
        const customerConnectAccountId = userData?.stripe_link_account_id
        if (!customerConnectAccountId) {
            return null;
        }

        return  await this.stripeRepository.findPendingFeedback(customerConnectAccountId);
    }

    async updateSessionRequest(sessionId: string, data: any): Promise<any> {
        const filter = {
            _id: ObjectId(sessionId)
        }
        //fetch session data against session id
        const sessionData = await this.stripeRepository.findSessionById(filter);
        if (data.is_active === 'APPROVED') {
            const paymentIntent = await this.createPaymentIntent(sessionData.price)
            data.payment_intent_id = paymentIntent.id
            //mange wallets
            await this.walletsManage(sessionData)
        }

        //get nylas event data and store it in this variable
        const nylasEventData = sessionData.options.nylasSessionRes;

        //coach connect account id for get coach nylas access token
        const coachConnectAccountId = sessionData.customer_connect_account_id

        //fetch coach data against connect account id
        const coachData = await this.usersService.findUserByConnectAccountId(coachConnectAccountId);
        const nylasAccessTokenCoach = coachData?.nylasAccessToken
        //api call for update status on nylas
        try{
            let authorizeNylas = await axios.put(UPDATE_Session_NYLAS + nylasEventData.id,
                {
                    metadata: {
                        ...nylasEventData.metadata,
                        status: data.is_active
                    }
                }, {
                    headers: {
                        Authorization: `Bearer ${nylasAccessTokenCoach}`
                    }
                });
            return  await this.stripeRepository.updateSession(filter, data);
        } catch (error) {
            return 'error'
        }
    }

    async updateSessionRequestCoach(id: string, data: any): Promise<any> {
        const filter = {
            'options.nylasSessionRes.id': id
        }
        //this is for update status on nylas server
        //fetch session data against session id
        const sessionData = await this.stripeRepository.findSessionById(filter);
        if (data.is_active === 'APPROVED') {
            const paymentIntent = await this.createPaymentIntent(sessionData.price)
            data.payment_intent_id = paymentIntent.id
            //mange wallets
            await this.walletsManage(sessionData)
        }
        //get nylas event data and store it in this variable
        const nylasEventData = sessionData.options.nylasSessionRes;

        //coach connect account id for get coach nylas access token
        const coachConnectAccountId = sessionData.customer_connect_account_id

        //fetch coach data against connect account id
        const coachData = await this.usersService.findUserByConnectAccountId(coachConnectAccountId);
        const nylasAccessTokenCoach = coachData?.nylasAccessToken
        //api call for update status on nylas
        // Creating Nylas Calendar
        // try{
        //     let authorizeNylas = await axios.put('https://api.nylas.com/events/' + nylasEventData.id,
        //         {
        //             metadata: {
        //                 ...nylasEventData.metadata,
        //                 status: data.is_active
        //             }
        //         }, {
        //             headers: {
        //                 Authorization: `Bearer ${nylasAccessTokenCoach}`
        //             }
        //         });
        //     return  await this.stripeRepository.updateSession(filter, data);
        // } catch (error) {
        //     return 'error'
        // }

        return  await this.stripeRepository.updateSession(filter, data);
    }

    async fetchSessionsCount(email: string): Promise<any> {
        const response = {
            name: "Sessions for last 30 days",
            totalCount: 0,
            average: 0
        }

        const userData = await this.usersService.findUserByEmail(email);
        const customerConnectAccountId = userData?.stripe_link_account_id
        if (!customerConnectAccountId) {
            return response;
        }

        const lastMonthSessions = await this.stripeRepository.findSessionsCount(customerConnectAccountId);
        const secondLastMonthSessions = await this.stripeRepository.findSecondLastMonthSessionsCount(customerConnectAccountId);
        if (lastMonthSessions.length > 0) {
            response.totalCount = lastMonthSessions[0].total_monthly_sessions
        }

        if (secondLastMonthSessions.length > 0) {
            response.average = response.totalCount - secondLastMonthSessions[0].second_last_monthly_sessions
        }

        return response
    }

    async fetchSessionsCountWithDateFilter(email: string, dateFrom: string, dateTo: string): Promise<any> {

        const userData = await this.usersService.findUserByEmail(email);
        const customerConnectAccountId = userData?.stripe_link_account_id
        if (!customerConnectAccountId) {
            return null;
        }
        return await this.stripeRepository.findSessionsCountWithDateFilter(customerConnectAccountId, dateFrom, dateTo);
    }


    async fetchSessionsResultWithDateFilter(email: string, dateFrom: string, dateTo: string): Promise<any> {

        const userData = await this.usersService.findUserByEmail(email);
        const customerConnectAccountId = userData?.stripe_link_account_id
        if (!customerConnectAccountId) {
            return null;
        }
        const daysDifference = getDateDifference(dateFrom, dateTo)
        const response = await this.stripeRepository.findSessionsWithDateFilter(customerConnectAccountId, dateFrom, dateTo, daysDifference);

        if (response.length > 0) {
            response.map((data: any) => {
                data.name = getMonthName(data._id.month);
                data.programs = 0;
                data.sessions = data.total;
                data.amt = 0;
            })
        }

        return response
    }

    async fetchHoursResultWithDateFilter(email: string, dateFrom: string, dateTo: string): Promise<any> {

        const userData = await this.usersService.findUserByEmail(email);
        const customerConnectAccountId = userData?.stripe_link_account_id
        if (!customerConnectAccountId) {
            return null;
        }
        const daysDifference = getDateDifference(dateFrom, dateTo)

        const result = await this.stripeRepository.findHoursWithDateFilter(customerConnectAccountId, dateFrom, dateTo, daysDifference);

        //converting minutes to hours

        if (result.length > 0) {
            result.map((items: any) => {
                items.total = items.total / 60;
                items.name = getMonthName(items._id.month);
                items.programs = 0;
                items.sessions = items.total;
                items.amt = 0;
            });
        }

        return result
    }


    async fetchHoursCountWithDateFilter(email: string, dateFrom: string, dateTo: string): Promise<any> {

        const userData = await this.usersService.findUserByEmail(email);
        const customerConnectAccountId = userData?.stripe_link_account_id
        if (!customerConnectAccountId) {
            return null;
        }
        return await this.stripeRepository.findHoursCountWithDateFilter(customerConnectAccountId, dateFrom, dateTo);
    }

    async storeSessions(email: string, data: any): Promise<any> {
        //this is check for if user will book session then we will user reqbody user_id for connect account id
        if (data.created_by === 'user') {
            //query for get connect account id against user_id
            const userData = await this.usersService.findUserByUserId(data.user_id);
            const customerConnectAccountId = userData?.stripe_link_account_id
            const coachId = userData?.user_id
            if (!customerConnectAccountId) {
                return null;
            }
            //query for get user_id against loggedIn user
            const loggedInUserData = await this.usersService.findUserByEmail(email);

            data.user_id = loggedInUserData?.user_id
            data.coach_id = coachId
            data.customer_connect_account_id = customerConnectAccountId

        } else {
            const userData = await this.usersService.findUserByEmail(email);
            const customerConnectAccountId = userData?.stripe_link_account_id
            if (!customerConnectAccountId) {
                return null;
            }
            data.customer_connect_account_id = customerConnectAccountId
            const coachId = userData?.user_id
            data.coach_id = coachId
        }
        return await this.stripeRepository.createSessions(data);
    }

    async fetchUserDataForNylas(connectAccountId: string): Promise<any> {
        return await this.usersService.findUserByConnectAccountId(connectAccountId);
    }

    async fetchSessionByFilter(filter: object): Promise<any> {
        return await this.stripeRepository.findSessionById(filter);
    }

    //Functions which are using for Nylas Its not related to our code

    async storeSessionsAfterNylas(data: any): Promise<any> {
        return await this.stripeRepository.createSessions(data);
    }

    async updateSessionAfterNylas(filter: object, data: any): Promise<any> {
        return await this.stripeRepository.updateSession(filter, data);
    }

    async createPaymentIntent (sessionPrice: any) {
            let price = 0;
            if (typeof sessionPrice == 'string') {
                price =  parseInt(sessionPrice) * 100
            } else {
                price =  sessionPrice * 100
            }
            //create payment intent if session is approved
           return await this.stripeRepository.createPaymentIntent(price)


    }

    async walletsManage(sessionData: any) {
        //fetch account wallet for user
        const userWallet = await this.walletAccountsService.findWalletByUserIdAndType(sessionData.user_id, USER_WALLET)
        //fetch subscription fee wallet
        const coachingSessionRevenueWallet = await this.walletAccountsService.findWalletByType(COACHING_SESSION_REVENUE_WALLET)
        //fetch subscription fee wallet
        const escrowWallet = await this.walletAccountsService.findWalletByType(ESCROW_ACCOUNT_WALLET)

        const sessionPrice = parseInt(sessionData.price);
        let coachingSessionRevenueAmount = sessionData.price - userWallet.wallet
        if (coachingSessionRevenueAmount < 0) {
            coachingSessionRevenueAmount = 0
        }

        //update coaching session revenue wallet
        await this.walletAccountsService.updateWalletById(coachingSessionRevenueWallet._id, coachingSessionRevenueAmount, DEBIT)
        //update user wallet
        await this.walletAccountsService.updateWalletById(userWallet._id, coachingSessionRevenueAmount, CREDIT)
        //update user wallet
        await this.walletAccountsService.updateWalletById(userWallet._id, sessionPrice, DEBIT)
        //update escrow wallet
        await this.walletAccountsService.updateWalletById(escrowWallet._id, sessionPrice, CREDIT)

        //entries into ledger
        await this.ledgerService.insertBalance(coachingSessionRevenueWallet.type, coachingSessionRevenueWallet._id, coachingSessionRevenueAmount, 0 )
        await this.ledgerService.insertBalance(userWallet.type, userWallet._id, 0, coachingSessionRevenueAmount)
        await this.ledgerService.insertBalance(userWallet.type, userWallet._id,sessionPrice, 0 )
        await this.ledgerService.insertBalance(escrowWallet.type, escrowWallet._id,0, sessionPrice )

        return true
    }
}
