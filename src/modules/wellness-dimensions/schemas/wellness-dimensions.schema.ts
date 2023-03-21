import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export type WellnessDimensionsDocument = WellnessDimensions & Document;

@Schema({
  collection: 'wellness-dimensions',
  timestamps: true,
})
export class WellnessDimensions {
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
  dimension_name: string;

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  focus_area: string;

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  description: string;

  @Prop({
    required: true,
    index: true,
    type: Array,
  })
  leading_questions: [];

}

export const WellnessDimensionsSchema = SchemaFactory.createForClass(WellnessDimensions);
