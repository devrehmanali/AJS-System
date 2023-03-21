import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export type AnswerDocument = Answer & Document;

@Schema({
  collection: 'answers',
  timestamps: true,
})
export class Answer {
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
  })
  question_id: string;

  @Prop({
    required: true,
    index: true,
    type: Array,
  })
  answer: [];

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  type: string;

  @Prop({
    index: true,
    type: String,
    default: 'user'
  })
  role: string;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
