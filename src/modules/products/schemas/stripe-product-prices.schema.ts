import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export type StripeProductPricesDocument = StripeProductPrices & Document;

@Schema({
  collection: 'stripe-product-prices',
  timestamps: true,
})
export class StripeProductPrices {
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
    type: String,
  })
  price_id: string;

  @Prop({
    index: true,
    type: Number,
  })
  price: number;

  @Prop({
    index: true,
    type: Boolean,
    default: true
  })
  monthly: boolean;

  @Prop({
    index: true,
    type: Boolean,
    default: false
  })
  yearly: boolean;
}

export const StripeProductPricesSchema = SchemaFactory.createForClass(StripeProductPrices);
