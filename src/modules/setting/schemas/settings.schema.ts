import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export type SettingDocument = Setting & Document;

@Schema({
  collection: 'settings',
  timestamps: true,
})
export class Setting {
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
    default: 'coach'
  })
  type: string;

  @Prop({
    index: true,
    type: String,
  })
  country: string;

  @Prop({
    index: true,
    type: String,
  })
  street_address: string;

  @Prop({
    index: true,
    type: String,
  })
  city: string;

  @Prop({
    index: true,
    type: String,
  })
  state: string;

  @Prop({
    index: true,
    type: String,
  })
  postal_code: string;

  @Prop({
    index: true,
    type: String,
  })
  phone_number: string;

  @Prop({
    type: String,
    index: true,
  })
  timezone: string;

  @Prop({
    type: String,
    index: true,
  })
  subscription: string;

  @Prop({
    index: true,
    type: Array,
  })
  payment_method: [];

  @Prop({
    type: String,
    index: true,
  })
  calender: string;

  @Prop({
    type: Object,
    index: true,
  })
  notification_setting: {};

  @Prop({
    type: String,
    index: true,
  })
  push_notification: string;

  @Prop({
    type: Object,
    index: true,
  })
  security: {};

  @Prop({
    type: Boolean,
    default: 0
  })
  is_age_hidden: Boolean;
  
  @Prop({
    type: Boolean,
    default: 0
  })
  is_gender_hidden: Boolean;

  @Prop({
    type: Boolean,
    default: 0
  })
  is_country_hidden: Boolean;
}

export const SettingSchema = SchemaFactory.createForClass(Setting);
