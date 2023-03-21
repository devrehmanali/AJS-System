import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';
import { ObjectId } from 'mongodb';

export type WalletAccountsDocument = WalletAccounts & Document;

@Schema({
  collection: 'wallet-accounts',
  timestamps: true,
})
export class WalletAccounts {
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
  user_id: string;

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  name: string;

  @Prop({
    index: true,
    type: String,
  })
  purpose: string;

  @Prop({
    required: true,
    index: true,
    type: String,
  })
  type: string;

  @Prop({
    required: true,
    index: true,
    type: Number,
    default: 0
  })
  wallet: number;

}

export const WalletAccountsSchema = SchemaFactory.createForClass(WalletAccounts);
