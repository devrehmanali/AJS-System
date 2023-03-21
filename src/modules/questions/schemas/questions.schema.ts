import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export type QuestionsDocument = Questions & Document;

const questionSchema = new mongoose.Schema({});

@Schema({
  collection: 'questions',
  timestamps: true,
})
export class Questions {
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
  questions: string;

  @Prop({
    index: true,
    type: String,
  })
  description: string;

  @Prop({
    required: true,
    index: true,
    type: Array,
  })
  options: string;

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  type: string;

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  role: string;

  @Prop({
    index: true,
    type: String,
    default: '1.0',
  })
  version: string;
}

export const QuestionsSchema = SchemaFactory.createForClass(Questions);
