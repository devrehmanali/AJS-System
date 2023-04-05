import { Module } from '@nestjs/common';
import { CommandModule } from 'nestjs-command';

import { RabbitMqModule } from '@/modules/rabbit-mq/rabbit-mq.module';
import { NotificationsSeed } from '@/modules/rabbit-mq/seeds/notifications.seed';
import { ProductsModule } from '@/modules/products/products.module';
import { StripeProductsSeed } from '@/modules/products/seeds/stripe-products.seed';
import { StripeProductPricesSeed } from '@/modules/products/seeds/stripe-product-prices.seed';

@Module({
  imports: [CommandModule, RabbitMqModule, ProductsModule],
  providers: [NotificationsSeed, StripeProductsSeed, StripeProductPricesSeed],
  exports: [NotificationsSeed, StripeProductsSeed, StripeProductPricesSeed],
})
export class SeedsModule { }
