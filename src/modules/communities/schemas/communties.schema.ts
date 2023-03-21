import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export type communitiesDocument = communities & Document;

@Schema({
  collection: 'communities',
  timestamps: true,
})
export class communities {
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
  name: string;

  @Prop({
    index: true,
    type: Array,
  })
  dimensions: [];

  @Prop({
    index: true,
    type: String,
  })
  description: string;

  @Prop({
    index: true,
    type: String,
  })
  image: string;
}

export const CommunitiesSchema = SchemaFactory.createForClass(communities);
