import { Module } from '@nestjs/common';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import {MongooseModule} from '@nestjs/mongoose';
import {StripeProducts, StripeProductsSchema} from '@/modules/products/schemas/stripe-products.schema';
import {StripeProductPrices, StripeProductPricesSchema} from '@/modules/products/schemas/stripe-product-prices.schema';
import {ProductsRepository} from '@/modules/products/products.repository';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: StripeProducts.name, schema: StripeProductsSchema }, { name: StripeProductPrices.name, schema: StripeProductPricesSchema }])],
  controllers: [ProductsController],
  providers: [ProductsService, ProductsRepository],
  exports: [ProductsService]
})
export class ProductsModule {}
