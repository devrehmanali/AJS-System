import { Module } from '@nestjs/common';
import { ViewsController } from './views.controller';
import { ViewsService } from './views.service';
import UsersModule from '@users/users.module';
import {MongooseModule} from '@nestjs/mongoose';
import {Views, ViewsSchema} from '@/modules/views/schemas/views.schema';
import {ViewsRepository} from '@/modules/views/views.repository';
import {FollowRequestService} from '@/modules/follow-request/follow-request.service';
import {FollowRequestRepository} from '@/modules/follow-request/follow-request.repository';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: Views.name, schema: ViewsSchema }]),
  ],
  controllers: [ViewsController],
  providers: [ViewsService, ViewsRepository],
  exports: [ViewsService, ViewsRepository],
})
export class ViewsModule {}
