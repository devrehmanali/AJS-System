import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { Role } from '@enums/role.enum';

export type ProfileDocument = Profile & Document;

@Schema({
  collection: 'profiles',
  timestamps: true,
})
export class Profile {
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
  title: string;

  @ApiProperty({ type: Array })
  @Prop({
    required: true,
    index: true,
    type: Array,
  })
  experience: [];

  @Prop({
    required: true,
    index: true,
    type: Array,
  })
  education: [];

  @Prop({
    required: true,
    index: true,
    type: Array,
  })
  language: [];

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  about: string;

  @Prop({
    index: true,
    type: String,
  })
  video_link: string;

  @Prop({
    index: true,
    type: String,
  })
  intro_video: string;

  @Prop({
    index: true,
    type: String,
    default: '$100',
  })
  rate: string;

  @Prop({
    index: true,
    type: String,
    default: '/60',
  })
  time_duration: string;

  @Prop({
    required: true,
    index: true,
    type: Array,
  })
  specialization: [];

  @Prop({
    required: false,
    index: true,
    type: Array,
  })
  certificates: [];

  @Prop({ type: String, index: true, default: 'coach' })
  type?: string;
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);
