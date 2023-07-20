import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
import { Role } from '@enums/role.enum';

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
    default: ''
  })
  avatar?: string;

  @Prop({
    index: true,
    type: String,
    default: ''
  })
  cover_image?: string;

  @Prop({ type: [String], enum: Role, default: [Role.COACH] })
  role: Role[];

  @Prop({ type: String, default: Role.COACH })
  activeRole: Role[];

  @Prop({
    type: Boolean,
    default: false,
    index: true,
  })
  isLoggedIn?: boolean;

  @Prop({
    type: Boolean,
    default: true,
    index: true,
  })
  is_active?: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);
