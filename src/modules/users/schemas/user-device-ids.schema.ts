import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export type UserDeviceIdsDocument = UserDeviceIds & Document;

@Schema({
  collection: 'user-device-ids',
  timestamps: true,
})
export class UserDeviceIds {
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
  device_id: string;
}

export const UserDeviceIdsSchema = SchemaFactory.createForClass(UserDeviceIds);
