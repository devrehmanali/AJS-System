import { Injectable } from '@nestjs/common';
import {UsersService} from '@users/users.service';
import {ViewsRepository} from '@/modules/views/views.repository';
import {getDateDifference, getMonthName} from '@helpers/general.helper';

@Injectable()
export class ViewsService {
    constructor(
        private usersService: UsersService,
        private viewsRepository: ViewsRepository) {
    }

    async postView(email: string, viewerId: string): Promise<object | null> {

        const userData = await this.usersService.findUserByEmail(email);
        // @ts-ignore
        const user_id = userData.user_id;

        const data = {
            user_id: user_id,
            viewer_user_id: viewerId
        }

        return await this.viewsRepository.findOneAndUpdate({user_id, viewer_user_id: viewerId}, data, {
            new: true,
            upsert: true // Make this update into an upsert
        });
    }

    async fetchViewsCount(email: string): Promise<any> {

        const user = await this.usersService.findUserByEmail(email);
        const userId: string | undefined = user?.user_id;
        const response = {
            name: "Views for last 30 days",
            totalCount: 0,
            average: 0
        }

        const lastMonthViews = await this.viewsRepository.monthlyViews(userId);
        const secondLastMonthViews = await this.viewsRepository.secondLastMonthlyViews(userId);
        if (lastMonthViews.length > 0) {
            response.totalCount = lastMonthViews[0].total_monthly_views
        }

        if (secondLastMonthViews.length > 0) {
            response.average = response.totalCount - secondLastMonthViews[0].second_last_monthly_views
        }

        return response
    }

    async fetchViewsCountWithDateFilter(email: string, dateFrom: string, dateTo: string): Promise<any> {

        const user = await this.usersService.findUserByEmail(email);
        const userId: string | undefined = user?.user_id;

        return await this.viewsRepository.monthlyViewsWithDateFilter(userId, dateFrom, dateTo);
    }

    async fetchViewsResultWithDateFilter(email: string, dateFrom: string, dateTo: string): Promise<any> {

        const user = await this.usersService.findUserByEmail(email);
        const userId: string | undefined = user?.user_id;

        const daysDifference = getDateDifference(dateFrom, dateTo)
        const result = await this.viewsRepository.monthlyViewsResultWithDateFilter(userId, dateFrom, dateTo, daysDifference);
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
