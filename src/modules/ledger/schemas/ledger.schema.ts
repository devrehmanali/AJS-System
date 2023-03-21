import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export type LedgerDocument = Ledger & Document;

@Schema({
  collection: 'ledger',
  timestamps: true,
})
export class Ledger {
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
  account_id: string;

  @Prop({
    index: true,
    type: Number,
    default: 0
  })
  debit: number;

  @Prop({
    index: true,
    type: Number,
    default: 0
  })
  credit: number;

  @Prop({
    required: true,
    index: true,
    type: Number,
    default: 0
  })
  balance: number;

  @Prop({
    index: true,
    type: String,
  })
  user_id: string;

}

export const LedgerSchema = SchemaFactory.createForClass(Ledger);
