import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export type NotificationsDocument = Notifications & Document;

@Schema({
  collection: 'notifications',
  timestamps: true,
})
export class Notifications {
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
  type: string;

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  message: string;

  @Prop({
    index: true,
    type: Boolean,
    default: false
  })
  is_seen: boolean;

  @Prop({
    index: true,
    type: Boolean,
    default: false
  })
  is_read: boolean;
}

export const NotificationsSchema = SchemaFactory.createForClass(Notifications);
