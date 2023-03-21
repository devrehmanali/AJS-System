import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export type communityMembersDocument = communityMembers & Document;

@Schema({
  collection: 'community-member',
  timestamps: true,
})
export class communityMembers {
  @ApiProperty()
  @Prop({
    type: ObjectId,
    default: () => {
      return new ObjectId();
    },
  })
  _id: ObjectId;

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  community_id: string;

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  community_member_user_id: string;
}

export const CommunityMembersSchema = SchemaFactory.createForClass(communityMembers);
