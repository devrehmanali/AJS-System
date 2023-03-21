import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {Ledger, LedgerDocument} from '@/modules/ledger/schemas/ledger.schema';


@Injectable()
export class LedgerRepository {
  constructor(
    @InjectModel(Ledger.name)
    private ledgerDocumentModel: Model<LedgerDocument>,
  ) {}

  async fetchLastRowByAccountId(filter: object): Promise<any> {
    return this.ledgerDocumentModel.findOne(filter).sort({createdAt: -1});
  }

  async createRecord(data: object): Promise<object | null> {
    return this.ledgerDocumentModel.create(data)
  }

}
