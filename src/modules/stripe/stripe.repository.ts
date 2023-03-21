import {Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {StripeDocument, StripeSubscriptions} from '@/modules/stripe/schemas/stripe.schema';
import {StripeSessionDocument, StripeSessions} from '@/modules/stripe/schemas/stripe-sessions.schema';
import {getCurrentDate, getRequiredDate} from '@helpers/general.helper';


@Injectable()
export class StripeRepository {
    constructor(
        @InjectModel(StripeSubscriptions.name) private stripeSubscriptionModel: Model<StripeDocument>,
        @InjectModel(StripeSessions.name) private stripeSessionModel: Model<StripeSessionDocument>,
    ) {
    }

    async create(data: any): Promise<any> {
        return await this.stripeSubscriptionModel.create(data);
    }

    async createSessions(data: any): Promise<any> {
        return await this.stripeSessionModel.create(data);
    }

    async findPlans(user_id: string): Promise<any> {
        return this.stripeSubscriptionModel.findOne({
            user_id: user_id
        });
    }

    async findPendingSessions(session_id: string | undefined): Promise<any> {
        return this.stripeSessionModel.findOne({
            _id: session_id,
            is_active: 'PENDING'
        });
    }

    async findApprovedSessions(session_id: string | undefined): Promise<any> {
        return this.stripeSessionModel.findOne({
            _id: session_id,
            is_active: 'APPROVED'
        });
    }

    async updateSession(filter: object, data: object): Promise<any> {
        return this.stripeSessionModel.updateOne(filter, data);
    }

    async findSessions(customerConnectId: string | undefined, filter: string, userId: string | undefined, role: string, sort: any): Promise<any> {
        let dynamicMatch
        let sorting: Record<string, | 1 | -1 | {$meta: "textScore"}>  = { date : 1 }
        const currentDate = getCurrentDate();

        if (sort && sort != undefined && sort === 'desc') {
            sorting = { date : -1 }
        }

        if (role === 'coach') {
            if (filter === 'ALL') {
                dynamicMatch = {
                    $match: {
                        customer_connect_account_id: customerConnectId,
                        date: {$gt: currentDate}
                    }
                }
            } else if (filter === 'APPROVED') {
                dynamicMatch = {
                    $match: {
                        $or: [{is_active: 'PENDING', created_by: 'coach'}, {is_active: 'APPROVED'} ] ,
                        customer_connect_account_id: customerConnectId,
                        date: {$gt: currentDate}
                    }
                }
            } else if (filter === 'PENDING') {
                dynamicMatch = {
                    $match: {
                        is_active: 'PENDING',
                        created_by: 'user' ,
                        customer_connect_account_id: customerConnectId,
                        date: {$gt: currentDate}
                    }
                }
            } else {
                dynamicMatch = {
                    $match: {
                        is_active: filter,
                        customer_connect_account_id: customerConnectId,
                        date: {$gt: currentDate}
                    }
                }
            }


            // filter !== 'ALL' ? dynamicMatch = {
            //         $match: {
            //             is_active: filter,
            //             customer_connect_account_id: customerConnectId,
            //             date: {$gt: currentDate}
            //         }
            //     }
            //     :
            //     dynamicMatch = {
            //         $match: {
            //             customer_connect_account_id: customerConnectId,
            //             date: {$gt: currentDate}
            //         }
            //     }
        } else {

            if (filter === 'ALL') {
                dynamicMatch = {
                    $match: {
                        user_id: userId,
                        date: {$gt: currentDate}
                    }
                }
            } else if (filter === 'APPROVED') {
                dynamicMatch = {
                    $match: {
                        $or: [{is_active: 'PENDING', created_by: 'user'}, {is_active: 'APPROVED'} ] ,
                        user_id: userId,
                        date: {$gt: currentDate}
                    }
                }
            } else if (filter === 'PENDING') {
                dynamicMatch = {
                    $match: {
                        is_active: 'PENDING',
                        created_by: 'coach' ,
                        user_id: userId,
                        date: {$gt: currentDate}
                    }
                }
            } else {
                dynamicMatch = {
                    $match: {
                        is_active: filter,
                        user_id: userId,
                        date: {$gt: currentDate}
                    }
                }
            }
            // filter !== 'ALL' ? dynamicMatch = {
            //         $match: {
            //             is_active: filter,
            //             user_id: userId,
            //             date: {$gt: currentDate}
            //         }
            //     }
            //     :
            //     dynamicMatch = {
            //         $match: {
            //             user_id: userId,
            //             date: {$gt: currentDate}
            //         }
            //     }
        }

        const result = await this.stripeSessionModel.aggregate([{
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: 'user_id',
                as: 'users'
            }
        },
            dynamicMatch,
            { $sort: sorting },
            {$unwind: "$users"},])

        return result;
    }

    async findPastSessions(customerConnectId: string | undefined, filter: string, userId: string | undefined, role: string, sort: any): Promise<any> {
        let dynamicMatch
        let sorting: Record<string, | 1 | -1 | {$meta: "textScore"}>  = { date : 1 }
        const currentDate = getCurrentDate();

        if (sort && sort != undefined && sort === 'desc') {
            sorting = { date : -1 }
        }

        if (role === 'coach') {
                dynamicMatch = {
                    $match: {
                        customer_connect_account_id: customerConnectId,
                        date: {$lt: currentDate}
                    }
                }
        } else {
                dynamicMatch = {
                    $match: {
                        user_id: userId,
                        date: {$lt: currentDate}
                    }
                }
        }

        const result = await this.stripeSessionModel.aggregate([{
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: 'user_id',
                as: 'users'
            }
        },
            dynamicMatch,
            { $sort: sorting },
            {$unwind: "$users"},])

        return result;
    }

    async findSessionsRequest(customerConnectId: string | undefined, filter: string, userId: string | undefined, role: string): Promise<any> {
        let dynamicMatch
        const currentDate = getCurrentDate();

        if (role === 'coach') {
            dynamicMatch = {
                $match: {
                    is_active: filter,
                    created_by: 'user',
                    customer_connect_account_id: customerConnectId,
                    date: {$gt: currentDate}
                }
            }
        } else {
            dynamicMatch = {
                    $match: {
                        is_active: filter,
                        user_id: userId,
                        created_by: 'coach',
                        date: {$gt: currentDate}
                    }
                }
        }

        const result = await this.stripeSessionModel.aggregate([{
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: 'user_id',
                as: 'users'
            }
        },
            dynamicMatch
            ,
            {$unwind: "$users"},])

        return result;
    }

    async findUpcomingSessions(customerConnectId: string | undefined, userId: string | undefined, role: string): Promise<any> {
        const currentDate = getCurrentDate();
        let dynamicMatch
        //if coach will create session then it will show in upcoming sessions there is no concern that user accept or reject this.
        //if user will reject then it will remove from upcoming sessions.
        if (role === 'coach') {
            dynamicMatch = {
                    $match: {
                        $or: [{is_active: 'PENDING', created_by: 'coach'}, {is_active: 'APPROVED'} ] ,
                        customer_connect_account_id: customerConnectId,
                        date: {$gt: currentDate}
                    }
                }
        } else {
           dynamicMatch = {
                    $match: {
                        is_active: 'APPROVED',
                        user_id: userId,
                        date: {$gte: currentDate}
                    }
                }
        }

        const result = await this.stripeSessionModel.aggregate([{
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: 'user_id',
                as: 'users'
            }
        },
            dynamicMatch
            ,
            {$unwind: "$users"},])

        return result;
    }

    async findUsersFeedback(customerConnectId: string | undefined): Promise<any> {
        const result = await this.stripeSessionModel.aggregate([{
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: 'user_id',
                as: 'users'
            }
        }, {
            $match: {
                $or: [{is_active: 'APPROVED'}, {is_active: 'COMPLETED'}],
                customer_connect_account_id: customerConnectId,
                user_feedback: {$exists: true}
            }
        },
            {$unwind: "$users"},])

        return result;
    }

    async findPendingFeedback(customerConnectId: string | undefined): Promise<any> {
        const result = await this.stripeSessionModel.aggregate([{
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: 'user_id',
                as: 'users'
            }
        }, {
            $match: {
                $or: [{is_active: 'APPROVED'}, {is_active: 'PENDING'}],
                customer_connect_account_id: customerConnectId,
                coach_feedback: {$exists: false}
            }
        },
            {$unwind: "$users"},])

        return result;
    }

    async findSessionsCount(customerConnectId: string | undefined): Promise<any> {
        const lastMonthDate = await getRequiredDate(30);

        const result = await this.stripeSessionModel.aggregate([
            {
                $match: {
                    is_active: 'COMPLETED',
                    customer_connect_account_id: customerConnectId,
                    createdAt: {$gt: lastMonthDate}
                }
            },
            {$count: "total_monthly_sessions"},
        ])
        return result;
    }

    async findSecondLastMonthSessionsCount(customerConnectId: string | undefined): Promise<any> {
        const lastMonthDate = await getRequiredDate(30);
        const secondLastMonthDate = await getRequiredDate(60);

        const result = await this.stripeSessionModel.aggregate([
            {
                $match: {
                    is_active: 'COMPLETED',
                    customer_connect_account_id: customerConnectId,
                    createdAt: {$gt: secondLastMonthDate,
                        $lt: lastMonthDate}
                }
            },
            {$count: "second_last_monthly_sessions"},
        ])
        return result;
    }

    async findSessionsCountWithDateFilter(customerConnectId: string | undefined, dateFrom: string, dateTo: string): Promise<any> {

        const result = await this.stripeSessionModel.aggregate([
            {
                $match: {
                    is_active: 'COMPLETED',
                    customer_connect_account_id: customerConnectId,
                    createdAt: {
                        $gte: new Date(dateFrom),
                        $lt: new Date(dateTo)
                    }
                }
            },
            {$count: "total_sessions"},
        ])
        return result;
    }

    async findSessionsWithDateFilter(customerConnectId: string | undefined, dateFrom: string, dateTo: string, daysDifference: any): Promise<any> {

        let queryFilter = {};
        if (daysDifference < 90) {
            queryFilter = {
                _id: {month: "$month", year: "$year", date: "$date"},
                total: {$sum: "$count"},
            }
        } else {
            queryFilter = {
                _id: {month: "$month", year: "$year"},
                total: {$sum: "$count"},
            }
        }

        const result = await this.stripeSessionModel.aggregate([
            {
                $match: {
                    is_active: 'COMPLETED',
                    customer_connect_account_id: customerConnectId,
                    createdAt: {
                        $gte: new Date(dateFrom),
                        $lt: new Date(dateTo)
                    }
                }
            },
            {
                $project: {
                    count: {$sum: 1},
                    month: {$month: "$createdAt"},
                    year: {$year: "$createdAt"},
                    date: "$createdAt"
                },
            },
            {$group: queryFilter}

        ])
        return result;
    }

    async findHoursWithDateFilter(customerConnectId: string | undefined, dateFrom: string, dateTo: string, daysDifference: any): Promise<any> {

        let queryFilter = {};
        if (daysDifference < 90) {
            queryFilter = {
                _id: {month: "$month", year: "$year", date: "$date"},
                total: {$sum: "$sum"},
            }
        } else {
            queryFilter = {
                _id: {month: "$month", year: "$year"},
                total: {$sum: "$sum"},
            }
        }

        const result = await this.stripeSessionModel.aggregate([
            {
                $match: {
                    is_active: 'COMPLETED',
                    customer_connect_account_id: customerConnectId,
                    createdAt: {
                        $gte: new Date(dateFrom),
                        $lt: new Date(dateTo)
                    }
                }
            },
            {
                $project: {
                    sum: {$sum: "$duration"},
                    month: {$month: "$createdAt"},
                    year: {$year: "$createdAt"},
                    date: "$createdAt"
                },
            },
            {$group: queryFilter}

        ])
        return result;
    }

    async findHoursCountWithDateFilter(customerConnectId: string | undefined, dateFrom: string, dateTo: string): Promise<any> {

        const result = await this.stripeSessionModel.aggregate([
            {
                $match: {
                    is_active: 'COMPLETED',
                    customer_connect_account_id: customerConnectId,
                    createdAt: {
                        $gte: new Date(dateFrom),
                        $lt: new Date(dateTo)
                    }
                }
            },
            {$group: {_id: null, total_minutes: {$sum: "$duration"}}}
        ])
        return result;
    }

    async findSessionById(filter: object): Promise<any> {
        return this.stripeSessionModel.findOne(filter)
    }

    async findSessionByIdWithUser(objectId: any): Promise<any> {
        const result = await this.stripeSessionModel.aggregate([{
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: 'user_id',
                as: 'users'
            }
        },
            {
                $match: {
                    _id: objectId
                }
            },
            {$unwind: "$users"},
        ])

        return result
    }

    async createPaymentIntent(price: any) {
        const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
        return await stripe.paymentIntents.create({
            amount: price,
            currency: 'usd',
        });
    }


}
