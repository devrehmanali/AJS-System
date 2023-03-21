import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {WalletAccounts, WalletAccountsDocument} from '@/modules/wallet-accounts/schemas/wallet-accounts.schema';


@Injectable()
export class WalletAccountsRepository {
  constructor(
    @InjectModel(WalletAccounts.name)
    private walletAccountsDocumentModel: Model<WalletAccountsDocument>,
  ) {}

  async findOneAndUpdate(filter: any, data: any, options: object): Promise<object | null> {
    return this.walletAccountsDocumentModel.findOneAndUpdate(filter,data, options);
  }

  async fetchWalletFilter(filter: object): Promise<object | null> {
    return this.walletAccountsDocumentModel.findOne(filter);
  }

  async updateWallet(filter: object, data: object): Promise<object | null> {
    return this.walletAccountsDocumentModel.updateOne(filter, data);
  }

}
