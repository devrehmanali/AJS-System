import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {ApiProperty} from '@nestjs/swagger';
import {ObjectId} from 'mongodb';

export type StripeDocument = StripeSubscriptions & Document;

@Schema({
  collection: 'stripe_subscriptions',
  timestamps: true,
})
export class StripeSubscriptions {
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
  subscription_id: string;

  @Prop({
    required: true,
    index: true,
    type: Number,
  })
  start_time: bigint;

  @Prop({
    required: true,
    index: true,
    type: Number,
  })
  end_time: bigint;

  @Prop({
    index: true,
    type: Boolean,
    default: false,
  })
  is_expire: boolean;

}

export const StripeSchema = SchemaFactory.createForClass(StripeSubscriptions);
