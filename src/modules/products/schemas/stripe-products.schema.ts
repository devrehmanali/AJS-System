import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export type StripeProductsDocument = StripeProducts & Document;

@Schema({
  collection: 'stripe-products',
  timestamps: true,
})
export class StripeProducts {
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
  product_id: string;

  @Prop({
    index: true,
    type: Boolean,
  })
  active: boolean;

  @Prop({
    index: true,
    type: Boolean,
  })
  live_mode: boolean;

  @Prop({
    index: true,
    type: Object,
  })
  metadata: object;

  @Prop({
    index: true,
    type: String,
  })
  name: string;
}

export const StripeProductsSchema = SchemaFactory.createForClass(StripeProducts);
