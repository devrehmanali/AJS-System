import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';
const moment = require('moment');

export type CoachRejectionReasoningDocument = CoachRejectionReasoning & Document;

@Schema({
  collection: 'coach-rejection-reasoning',
  timestamps: true,
})
export class CoachRejectionReasoning {
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
  reasoning_id: string;
}

export const CoachRejectionReasoningSchema = SchemaFactory.createForClass(CoachRejectionReasoning);
