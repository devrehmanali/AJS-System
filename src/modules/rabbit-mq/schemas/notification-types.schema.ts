import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export type NotificationTypesDocument = NotificationTypes & Document;

@Schema({
  collection: 'notification-types',
  timestamps: true,
})
export class NotificationTypes {
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
  action: string;

  @Prop({
    index: true,
    type: String
  })
  mobile_push_notification_user: string;

  @Prop({
    index: true,
    type: String
  })
  mobile_push_notification_coach: string;

  @Prop({
    index: true,
    type: String
  })
  in_app_notification_user: string;

  @Prop({
    index: true,
    type: String
  })
  in_app_notification_coach: string;

  @Prop({
    index: true,
    type: String
  })
  email_notification_user: string;

  @Prop({
    index: true,
    type: String,
  })
  email_template_no_user: string;

  @Prop({
    index: true,
    type: String
  })
  email_notification_coach: string;

  @Prop({
    index: true,
    type: String,
  })
  email_template_no_coach: string;

  @Prop({
    index: true,
    type: String,
  })
  email_notification_admin: string;
}

export const NotificationTypesSchema = SchemaFactory.createForClass(NotificationTypes);
