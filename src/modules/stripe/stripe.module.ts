import { Module } from '@nestjs/common';
import { StripeController } from './stripe.controller';
import { StripeService } from './stripe.service';
import UsersModule from "@users/users.module";
import {MongooseModule} from '@nestjs/mongoose';
import {StripeSubscriptions, StripeSchema} from '@/modules/stripe/schemas/stripe.schema';
import {StripeRepository} from '@/modules/stripe/stripe.repository';
import {StripeSessions, StripeSessionSchema} from '@/modules/stripe/schemas/stripe-sessions.schema';
import {WalletAccountsModule} from '@/modules/wallet-accounts/wallet-accounts.module';
import {LedgerModule} from '@/modules/ledger/ledger.module';
import {ProductsModule} from '@/modules/products/products.module';


@Module({
  controllers: [StripeController],
  providers: [StripeService, StripeRepository],
  imports: [
      UsersModule,
      ProductsModule,
    WalletAccountsModule,
    LedgerModule,
    MongooseModule.forFeature([{ name: StripeSubscriptions.name, schema: StripeSchema }, { name: StripeSessions.name, schema: StripeSessionSchema }])],
  exports: [StripeService, StripeRepository]
})
export class StripeModule {}
