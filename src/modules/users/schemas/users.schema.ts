import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { Role } from '@enums/role.enum';
import {DRAFT} from '@/constants/coachStatusConstants';
const moment = require('moment');

export type UserDocument = User & Document;

@Schema({
  collection: 'users',
  timestamps: true,
})
export class User {
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
    unique: true,
    index: true,
    type: String,
  })
  user_id: string;

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  first_name: string;

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  last_name: string;

  @Prop({
    required: true,
    unique: true,
    type: String,
  })
  email: string;

  @Prop({
    index: true,
    type: String,
  })
  gender: string;

  @Prop({
    index: true,
    type: String,
  })
  age: string;

  @Prop({
    required: true,
    type: String,
  })
  password?: string;

  @Prop({
    index: true,
    type: String,
    default: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/male-avatar.jpeg'
  })
  avatar?: string;

  @Prop({
    index: true,
    type: String,
    default: 'https://wellavi.s3.ap-northeast-1.amazonaws.com/male-avatar.jpeg'
  })
  cover_image?: string;

  @Prop({
    index: true,
    type: String,
  })
  stripe_customer_id?: string;

  @Prop({
    index: true,
    type: Boolean,
    default: false
  })
  is_user_assessment_completed?: boolean;

  @Prop({
    index: true,
    type: Boolean,
    default: false
  })
  is_coach_assessment_completed?: boolean;

  @Prop({
    index: true,
    type: Boolean,
    default: false
  })
  is_coach_approved?: boolean;

  @Prop({
    index: true,
    type: String,
    default: DRAFT
  })
  coach_status?: string;

  @Prop({
    index: true,
    type: String,
  })
  stripe_link_account_url?: string;

  @Prop({
    index: true,
    type: String,
  })
  stripe_link_account_id?: string;

  @Prop({ type: [String], enum: Role, default: [Role.COACH] })
  role: Role[];

  @Prop({
    type: Boolean,
    default: false,
    index: true,
  })
  isLoggedIn?: boolean;

  @Prop({
    type: [Object],
    default: [
      {
        id: Math.random() * 1000000,
        scheduleAsActive: true,
        name: 'Weekly Hours',
        default: true,
        timezone: 'UTC',
        viewOption: 'Sunday',
        weeklyHours: [
          {
            name: 'Sunday',
            active: false,
            availability: [
              {
                id: Math.random() * 1000000,
                from: moment().hour(9).minute(0).unix(),
                to: moment().hour(17).minute(0).unix(),
              },
            ],
          },
          {
            name: 'Monday',
            active: true,
            availability: [
              {
                id: Math.random() * 1000000,
                from: moment().hour(9).minute(0).unix(),
                to: moment().hour(17).minute(0).unix(),
              },
            ],
          },
          {
            name: 'Tuesday',
            active: true,
            availability: [
              {
                id: Math.random() * 1000000,
                from: moment().hour(9).minute(0).unix(),
                to: moment().hour(17).minute(0).unix(),
              },
            ],
          },
          {
            name: 'Wednesday',
            active: true,
            availability: [
              {
                id: Math.random() * 1000000,
                from: moment().hour(9).minute(0).unix(),
                to: moment().hour(17).minute(0).unix(),
              },
            ],
          },
          {
            name: 'Thursday',
            active: true,
            availability: [
              {
                id: Math.random() * 1000000,
                from: moment().hour(9).minute(0).unix(),
                to: moment().hour(17).minute(0).unix(),
              },
            ],
          },
          {
            name: 'Friday',
            active: true,
            availability: [
              {
                id: Math.random() * 1000000,
                from: moment().hour(9).minute(0).unix(),
                to: moment().hour(17).minute(0).unix(),
              },
            ],
          },
          {
            name: 'Saturday',
            active: false,
            availability: [
              {
                id: Math.random() * 1000000,
                from: moment().hour(9).minute(0).unix(),
                to: moment().hour(17).minute(0).unix(),
              },
            ],
          },
        ],
      },
    ],
  })
  availabilities?: Array<Object>;

  @Prop({
    type: String,
    default: false,
    index: true,
  })
  nylasAccountId?: string;

  @Prop({
    type: String,
    default: false,
    index: true,
  })
  nylasAccessToken?: string;

  @Prop({
    type: String,
    default: false,
    index: true,
  })
  nylasCalendarId?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
