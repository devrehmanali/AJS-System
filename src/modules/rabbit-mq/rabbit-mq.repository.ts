import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {NotificationTypes, NotificationTypesDocument} from '@/modules/rabbit-mq/schemas/notification-types.schema';


@Injectable()
export class RabbitMqRepository {
  constructor(
    @InjectModel(NotificationTypes.name)
    private notificationTypesModel: Model<NotificationTypesDocument>,
  ) {}

  async create(data: any): Promise<object | undefined> {
    return this.notificationTypesModel.create(data);
  }

  async findOneAndUpdate(filter: any, data: any, options: object): Promise<object | null> {
    return  this.notificationTypesModel.findOneAndUpdate(filter,data, options);
  }

}
