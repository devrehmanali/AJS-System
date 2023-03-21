import { Module } from '@nestjs/common';
import { LedgerController } from './ledger.controller';
import { LedgerService } from './ledger.service';
import {MongooseModule} from '@nestjs/mongoose';
import {Ledger, LedgerSchema} from '@/modules/ledger/schemas/ledger.schema';
import {LedgerRepository} from '@/modules/ledger/ledger.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Ledger.name, schema: LedgerSchema }]),
  ],
  controllers: [LedgerController],
  providers: [LedgerService, LedgerRepository],
  exports: [LedgerService]
})
export class LedgerModule {}
