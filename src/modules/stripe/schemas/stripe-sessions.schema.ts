import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import {ApiProperty} from '@nestjs/swagger';
import {ObjectId} from 'mongodb';

export type StripeSessionDocument = StripeSessions & Document;

@Schema({
  collection: 'stripe_sessions',
  timestamps: true,
})
export class StripeSessions {
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
    index: true,
    type: String,
  })
  payment_intent_id: string;

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  customer_connect_account_id: string;

  @Prop({
    index: true,
    type: String,
  })
  connect_transfer_id: string;

  @Prop({
    index: true,
    type: Number,
  })
  duration: number;

  @Prop({
    index: true,
    type: Date,
  })
  date: Date;

  @Prop({
    index: true,
    type: String,
  })
  time: string;

  @Prop({
    index: true,
    type: String,
  })
  scope: string;

  @Prop({
    index: true,
    type: Object,
  })
  options: object;

  @Prop({
    index: true,
    type: String,
  })
  price: string;

  @Prop({
    index: true,
    type: String,
  })
  type: string;

  @Prop({
    index: true,
    type: String,
  })
  coach_feedback: string;


  @Prop({
    index: true,
    type: String,
  })
  user_feedback: string;

  @Prop({
    index: true,
    type: String,
    default: 'PENDING',
  })
  is_active: string;

  @Prop({
    index: true,
    type: String,
    default: 'coach',
  })
  created_by: string;

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  coach_id: string;

}

export const StripeSessionSchema = SchemaFactory.createForClass(StripeSessions);
