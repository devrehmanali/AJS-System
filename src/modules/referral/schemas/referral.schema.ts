import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export type ReferralDocument = Referral & Document;

@Schema({
  collection: 'referrals',
  timestamps: true,
})
export class Referral {
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
  user_id: string;

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  referral_user_id: string;

  @Prop({
    index: true,
    type: String,
  })
  referral_type: string;

}

export const ReferralSchema = SchemaFactory.createForClass(Referral);
