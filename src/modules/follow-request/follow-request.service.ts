import { Injectable } from '@nestjs/common';
import {UsersService} from "@users/users.service";
import {FollowRequestRepository} from "@/modules/follow-request/follow-request.repository";
import {getDateDifference, getMonthName} from '@helpers/general.helper';

@Injectable()
export class FollowRequestService {
    constructor(
        private readonly followRequestRepository: FollowRequestRepository,
        private readonly userService: UsersService,
    ) {}

    async createFollowRequest(userEmail: string, followingUserId: string): Promise<object | null> {
        const user = await this.userService.findUserByEmail(userEmail);
        const userId: string | undefined = user?.user_id;

        const data = {
            user_id: userId,
            following_user_id: followingUserId
        }

        return await this.followRequestRepository.findOneAndUpdate(data, data, {
            new: true,
            upsert: true // Make this update into an upsert
        });
    }

    async deleteFollowRequest(userEmail: string, reqBody: any): Promise<object | any> {
        const user = await this.userService.findUserByEmail(userEmail);
        const followingUserId: string | undefined = user?.user_id;
        let result;
        for (let i = 0; i < reqBody.user_id.length; i++) {
            const data = {
                user_id: reqBody.user_id[i],
                following_user_id: followingUserId
            }
            result = await this.followRequestRepository.deleteOne(data)
        }
        return result;
    }

    async deleteFollower(userEmail: string, userId: string): Promise<object | any> {
        const user = await this.userService.findUserByEmail(userEmail);
        const followingUserId: string | undefined = user?.user_id;
        const data = {
            user_id: userId,
            following_user_id: followingUserId
        }
        return await this.followRequestRepository.deleteOne(data)
    }

    async isFollowing(userEmail: string, followingUserId: string): Promise<object | any> {
        const user = await this.userService.findUserByEmail(userEmail);
        const userId: string | undefined = user?.user_id;

        const data = {
            user_id: userId,
            following_user_id: followingUserId
        }

        return await this.followRequestRepository.findOne(data);
    }

    async fetchFollowersList(userEmail: string): Promise<object | any> {
        let followers = [];
        const user = await this.userService.findUserByEmail(userEmail);
        // @ts-ignore
        const userId: string = user.user_id;
        const followersList: any = await this.followRequestRepository.findFollowersList(userId);
        for (const follower of followersList) {
            const filteredData = {
                _id: follower.followers[0]?._id,
                user_id:follower.followers[0]?.user_id,
                first_name:follower.followers[0]?.first_name,
                last_name:follower.followers[0]?.last_name,
                email:follower.followers[0]?.email,
            }
            followers.push(filteredData);
        }

        return followers;
    }

    async fetchFollowingsList(userEmail: string): Promise<object | any> {
        let followingsArr = [];
        const user = await this.userService.findUserByEmail(userEmail);
        // @ts-ignore
        const userId: string = user.user_id;
        const followingsList: any = await this.followRequestRepository.findFollowingsList(userId);
        for (const followings of followingsList) {

            const filteredData = {
                _id: followings.followers[0]._id,
                user_id: followings.followers[0].user_id,
                first_name: followings.followers[0].first_name,
                last_name: followings.followers[0].last_name,
                email: followings.followers[0].email,
                avatar: followings.followers[0].avatar,
                title: followings.followers[0].profile.length > 0 ? followings.followers[0].profile[0].title : '',
            }
            followingsArr.push(filteredData);
        }

        return followingsArr;
    }
    
    async fetchMonthlyFollowers(userEmail: string,): Promise<object | any> {
        const user = await this.userService.findUserByEmail(userEmail);
        const userId: string | undefined = user?.user_id;
        const response = {
            name: "Followers for last 30 days",
            totalCount: 0,
            average: 0
        }

        const lastMonthFollowers = await this.followRequestRepository.monthlyFollowers(userId);
        const secondLastMonthFollowers = await this.followRequestRepository.secondLastMonthFollowers(userId);
        if (lastMonthFollowers.length > 0) {
            response.totalCount = lastMonthFollowers[0].total_monthly_followers
        }

        if (secondLastMonthFollowers.length > 0) {
            response.average = response.totalCount - secondLastMonthFollowers[0].second_last_monthly_followers
        }

        return response
    }

    async fetchFollowersWithDateFilter(userEmail: string, dateFrom: string, dateTo: string): Promise<object | any> {
        const user = await this.userService.findUserByEmail(userEmail);
        const userId: string | undefined = user?.user_id;

        return await this.followRequestRepository.FollowersCountWithDateFilter(userId, dateFrom, dateTo);
    }

    async fetchFollowersResultWithDateFilter(userEmail: string, dateFrom: string, dateTo: string): Promise<object | any> {
        const user = await this.userService.findUserByEmail(userEmail);
        const userId: string | undefined = user?.user_id;

        const daysDifference = getDateDifference(dateFrom, dateTo)

        const result = await this.followRequestRepository.FollowersResultWithDateFilter(userId, dateFrom, dateTo, daysDifference);

        if (result.length > 0) {
            result.map((items: any) => {
                items.name = getMonthName(items._id.month);
                items.programs = 0;
                items.sessions = items.total;
                items.amt = 0;
            });
        }

        return result
    }
}
