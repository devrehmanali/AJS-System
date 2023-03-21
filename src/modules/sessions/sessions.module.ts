import { Module } from '@nestjs/common';
import { SessionsController } from './sessions.controller';
import { SessionsService } from './sessions.service';
import UsersModule from '@users/users.module';
import {SessionsRepository} from '@/modules/sessions/sessions.repository';
import {StripeModule} from '@/modules/stripe/stripe.module';
import {WalletAccountsModule} from '@/modules/wallet-accounts/wallet-accounts.module';
import {LedgerModule} from '@/modules/ledger/ledger.module';

@Module({
  imports: [UsersModule, StripeModule, WalletAccountsModule, LedgerModule],
  controllers: [SessionsController],
  providers: [SessionsService],
  exports: [SessionsService]
})
export class SessionsModule {}
