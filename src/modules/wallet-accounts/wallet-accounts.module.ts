import { Module } from '@nestjs/common';
import { WalletAccountsController } from './wallet-accounts.controller';
import { WalletAccountsService } from './wallet-accounts.service';
import {MongooseModule} from '@nestjs/mongoose';
import {WalletAccounts, WalletAccountsSchema} from '@/modules/wallet-accounts/schemas/wallet-accounts.schema';
import {WalletAccountsRepository} from '@/modules/wallet-accounts/wallet-accounts.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: WalletAccounts.name, schema: WalletAccountsSchema }]),
  ],
  controllers: [WalletAccountsController],
  providers: [WalletAccountsService, WalletAccountsRepository],
  exports: [WalletAccountsService]
})
export class WalletAccountsModule {}
