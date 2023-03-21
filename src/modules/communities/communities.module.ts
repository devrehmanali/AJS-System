import { Module } from '@nestjs/common';
import { CommunitiesController } from './communities.controller';
import { CommunitiesService } from './communities.service';
import UsersModule from '@users/users.module';
import {MongooseModule} from '@nestjs/mongoose';
import {communities, CommunitiesSchema} from '@/modules/communities/schemas/communties.schema';
import {communityMembers, CommunityMembersSchema} from '@/modules/communities/schemas/communty-members.schema';
import {CommunitiesRepository} from '@/modules/communities/communities.repository';
import {UploadsModule} from '@/modules/uploads/uploads.module';

@Module({
  imports: [
    UsersModule,
    MongooseModule.forFeature([{ name: communities.name, schema: CommunitiesSchema },
      { name: communityMembers.name, schema: CommunityMembersSchema }]),
    UploadsModule
  ],
  controllers: [CommunitiesController],
  providers: [CommunitiesService, CommunitiesRepository]
})
export class CommunitiesModule {}
