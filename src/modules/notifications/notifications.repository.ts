import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Notifications, NotificationsDocument} from '@/modules/notifications/schemas/notifications.schema';

@Injectable()
export class NotificationsRepository {
  constructor(
    @InjectModel(Notifications.name)
    private notificationsModel: Model<NotificationsDocument>,
  ) {}
  async fetchAll(filter: object): Promise<object | undefined> {
    return this.notificationsModel.find(filter).sort({createdAt:1});
  }

  async fetchUnSeenNotificationsCount(filter: object): Promise<any> {
    return this.notificationsModel.find(filter).count();
  }

  async updateNotifications(filter: object, data: object): Promise<any> {
    return this.notificationsModel.updateOne(filter, data);
  }


}
