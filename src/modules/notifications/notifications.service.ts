import { Injectable } from '@nestjs/common';
import {NotificationsRepository} from '@/modules/notifications/notifications.repository';
import {UsersService} from '@users/users.service';
const {Types: {ObjectId: ObjectId}} = require("mongoose");

@Injectable()
export class NotificationsService {
    constructor(private readonly notificationsRepository: NotificationsRepository,
                private readonly usersService: UsersService) {}

    async findNotifications(email: string): Promise<object | undefined> {
        const userData = await this.usersService.findUserByEmail(email);
        const userId = userData?.user_id

        return await this.notificationsRepository.fetchAll({user_id: userId});
    }

    async findUnSeenNotificationsCount(email: string): Promise<any> {
        const userData = await this.usersService.findUserByEmail(email);
        const userId = userData?.user_id

        return await this.notificationsRepository.fetchUnSeenNotificationsCount({user_id: userId, is_seen: false});
    }

    async updateUnSeenNotifications(ids: any): Promise<any> {
        ids.id.map(async (item: any) => {
            await this.notificationsRepository.updateNotifications({_id: ObjectId(item)}, {is_seen: true});
        })
        return true
    }

    async updateNotificationReadStatus(ids: any): Promise<any> {
        ids.id.map(async (item: any) => {
            await this.notificationsRepository.updateNotifications({_id: ObjectId(item)}, {is_read: true});
        })
        return true
    }
}
