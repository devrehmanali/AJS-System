import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export type ReasoningDocument = Reasoning & Document;

@Schema({
  collection: 'reasoning',
  timestamps: true,
})
export class Reasoning {
  @ApiProperty()
  @Prop({
    type: ObjectId,
    default: () => {
      return new ObjectId();
    },
  })
  _id: ObjectId;

  @Prop({
    index: true,
    type: String,
  })
  name: string;

}

export const ReasoningSchema = SchemaFactory.createForClass(Reasoning);
