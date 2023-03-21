import {Module} from '@nestjs/common';
import {MongooseModule} from "@nestjs/mongoose";
import {followRequest, FollowRequestSchema} from "./schemas/follow-request.schema";
import {FollowRequestController} from './follow-request.controller';
import {FollowRequestService} from './follow-request.service';
import {FollowRequestRepository} from "@/modules/follow-request/follow-request.repository";
import UsersModule from "@users/users.module";

@Module({
  imports: [
      UsersModule,
      MongooseModule.forFeature([{ name: followRequest.name, schema: FollowRequestSchema }]),
  ],
    controllers: [FollowRequestController],
  providers: [FollowRequestService, FollowRequestRepository],
  exports: [FollowRequestService, FollowRequestRepository],
})
export class FollowRequestModule {}
