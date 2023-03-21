import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

import { QuestionsSeed } from '../modules/questions/seeds/questions.seed';
import QuestionsModule from '../modules/questions/questions.module';
import {RabbitMqModule} from '@/modules/rabbit-mq/rabbit-mq.module';
import {NotificationsSeed} from '@/modules/rabbit-mq/seeds/notifications.seed';
import {ReasoningModule} from '@/modules/reasoning/reasoning.module';
import {ReasoningSeed} from '@/modules/reasoning/seeds/reasoning.seed';
import {ProductsModule} from '@/modules/products/products.module';
import {StripeProductsSeed} from '@/modules/products/seeds/stripe-products.seed';
import {StripeProductPricesSeed} from '@/modules/products/seeds/stripe-product-prices.seed';
import {WalletAccountsModule} from '@/modules/wallet-accounts/wallet-accounts.module';
import {WalletAccountsSeed} from '@/modules/wallet-accounts/seeds/wallet-accounts.seed';
import {WellnessDimensionsModule} from '@/modules/wellness-dimensions/wellness-dimensions.module';
import {WellnessDimensionsSeed} from '@/modules/wellness-dimensions/seeds/wellness-dimensions.seed';

@Module({
  imports: [CommandModule, QuestionsModule, RabbitMqModule, ReasoningModule, ProductsModule, WalletAccountsModule, WellnessDimensionsModule],
  providers: [QuestionsSeed, NotificationsSeed, ReasoningSeed, StripeProductsSeed, StripeProductPricesSeed, WalletAccountsSeed, WellnessDimensionsSeed],
  exports: [QuestionsSeed, NotificationsSeed, ReasoningSeed, StripeProductsSeed, StripeProductPricesSeed, WalletAccountsSeed, WellnessDimensionsSeed],
})
export class SeedsModule {}
