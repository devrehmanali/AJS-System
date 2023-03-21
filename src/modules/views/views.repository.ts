import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Model} from "mongoose";
import {Views, ViewsDocument} from '@/modules/views/schemas/views.schema';
import {getRequiredDate} from '@helpers/general.helper';

@Injectable()
export class ViewsRepository {
  constructor(
      @InjectModel(Views.name) private viewsModel: Model<ViewsDocument>,
  ) {}

  async findOneAndUpdate(filter: any, data: any, options: object): Promise<object | null> {
    return this.viewsModel.findOneAndUpdate(filter,data, options);
  }

  async monthlyViews(userId: string | undefined): Promise<object | any> {
    const lastMonthDate = await getRequiredDate(30);

    const result = await this.viewsModel.aggregate([
      { $match : {
          viewer_user_id: userId,
          createdAt: {$gt: lastMonthDate}
        }
      },
      { $count: "total_monthly_views"},
    ])
    return result;
  }

  async secondLastMonthlyViews(userId: string | undefined): Promise<object | any> {
    const lastMonthDate = await getRequiredDate(30);
    const secondLastMonthDate = await getRequiredDate(60);

    const result = await this.viewsModel.aggregate([
      { $match : {
          viewer_user_id: userId,
          createdAt: {$gt: secondLastMonthDate,
            $lt: lastMonthDate}
        }
      },
      { $count: "second_last_monthly_views"},
    ])
    return result;
  }

  async monthlyViewsWithDateFilter(userId: string | undefined, dateFrom: string, dateTo: string): Promise<object | null> {

    const result = await this.viewsModel.aggregate([
      { $match : {
          viewer_user_id: userId,
          createdAt: { $gte: new Date(dateFrom),
            $lt: new Date(dateTo)}
        }
      },
      { $count: "total_views"},
    ])
    return result;
  }

  async monthlyViewsResultWithDateFilter(userId: string | undefined, dateFrom: string, dateTo: string, daysDifference: any): Promise<any> {

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

    const result = await this.viewsModel.aggregate([
      {
        $match: {
          viewer_user_id: userId,
          createdAt: { $gte: new Date(dateFrom),
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
