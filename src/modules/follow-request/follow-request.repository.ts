import { Injectable } from '@nestjs/common';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { followRequest, followRequestDocument } from "@/modules/follow-request/schemas/follow-request.schema";
import {getRequiredDate} from '@helpers/general.helper';
@Injectable()
export class FollowRequestRepository {
    constructor(
        @InjectModel(followRequest.name) private followRequestModel: Model<followRequestDocument>,
    ) { }

    async findOneAndUpdate(filter: any, data: any, options: object): Promise<object | null> {
        return this.followRequestModel.findOneAndUpdate(filter, data, options);
    }

    async deleteOne(filter: any): Promise<object | null> {
        return this.followRequestModel.deleteOne(filter);
    }

    async findOne(filter: any): Promise<object | null> {
        return this.followRequestModel.findOne(filter);
    }

    async findFollowersList(userId: string): Promise<object | null> {
        const result = await this.followRequestModel.aggregate([{
            $lookup: {
                from: 'users',
                localField: 'following_user_id',
                foreignField: 'user_id',
                as: 'followers'
            }
        }, { $match: { user_id: userId } }])
        return result;
    }

    async findFollowingsList(userId: string): Promise<object | null> {
        const result = await this.followRequestModel.aggregate([{
            $lookup: {
                from: 'users',
                localField: 'user_id',
                foreignField: 'user_id',
                as: 'followers',
                pipeline: [
                    {
                        $lookup: {
                            from: "profiles",
                            localField: "user_id",
                            foreignField: "user_id",
                            as: "profile",
                        }
                    }
                ]
            }
        }, { $match: { following_user_id: userId } }])
        return result;
    }
    
    async monthlyFollowers(userId: string | undefined): Promise<object | any> {
        const lastMonthDate = await getRequiredDate(30);

        const result = await this.followRequestModel.aggregate([
            { $match : {
                    following_user_id: userId,
                    createdAt: {$gt: lastMonthDate}
                }
            },
            { $count: "total_monthly_followers"},
        ])
        return result;
    }

    async secondLastMonthFollowers(userId: string | undefined): Promise<object | any> {
        const lastMonthDate = await getRequiredDate(30);
        const secondLastMonthDate = await getRequiredDate(60);

        const result = await this.followRequestModel.aggregate([
            { $match : {
                    following_user_id: userId,
                    createdAt: {$gt: secondLastMonthDate,
                    $lt: lastMonthDate}
                }
            },
            { $count: "second_last_monthly_followers"},
        ])
        return result;
    }

    async FollowersCountWithDateFilter(userId: string | undefined, dateFrom: string, dateTo: string): Promise<object | null> {

        const result = await this.followRequestModel.aggregate([
            { $match : {
                    following_user_id: userId,
                    createdAt: {$gte: new Date(dateFrom),
                        $lt: new Date(dateTo)}
                }
            },
            { $count: "total_followers"},
        ])
        return result;
    }

    async FollowersResultWithDateFilter(userId: string | undefined, dateFrom: string, dateTo: string, daysDifference: any): Promise<any> {

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

        const result = await this.followRequestModel.aggregate([
            {
                $match: {
                    following_user_id: userId,
                    createdAt: {$gte: new Date(dateFrom),
                        $lt: new Date(dateTo)}
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
}
