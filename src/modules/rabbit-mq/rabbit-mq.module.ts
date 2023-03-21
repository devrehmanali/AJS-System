import {forwardRef, Module} from '@nestjs/common';
import { RabbitMqController } from './rabbit-mq.controller';
import { RabbitMqService } from './rabbit-mq.service';
import {MongooseModule} from '@nestjs/mongoose';
import {NotificationTypes, NotificationTypesSchema} from '@/modules/rabbit-mq/schemas/notification-types.schema';
import {RabbitMqRepository} from '@/modules/rabbit-mq/rabbit-mq.repository';
import UsersModule from '@users/users.module';

@Module({
  imports: [MongooseModule.forFeature([{ name: NotificationTypes.name, schema: NotificationTypesSchema }]),
    forwardRef(() => UsersModule)],
  controllers: [RabbitMqController],
  providers: [RabbitMqService, RabbitMqRepository],
  exports: [RabbitMqService],
})
export class RabbitMqModule {}
