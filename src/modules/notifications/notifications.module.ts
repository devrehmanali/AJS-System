import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import {MongooseModule} from '@nestjs/mongoose';
import {Notifications, NotificationsSchema} from '@/modules/notifications/schemas/notifications.schema';
import UsersModule from '@users/users.module';
import {NotificationsRepository} from '@/modules/notifications/notifications.repository';

@Module({
  imports: [
      UsersModule,
    MongooseModule.forFeature([{ name: Notifications.name, schema: NotificationsSchema }]),
  ],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsRepository]
})
export class NotificationsModule {}
