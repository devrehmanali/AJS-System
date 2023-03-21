import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {StripeProducts, StripeProductsDocument} from '@/modules/products/schemas/stripe-products.schema';
import {
  StripeProductPrices,
  StripeProductPricesDocument
} from '@/modules/products/schemas/stripe-product-prices.schema';


@Injectable()
export class ProductsRepository {
  constructor(
    @InjectModel(StripeProducts.name)
    private stripeProductsDocumentModel: Model<StripeProductsDocument>,
    @InjectModel(StripeProductPrices.name)
    private stripeProductPricesDocumentModel: Model<StripeProductPricesDocument>,
  ) {}


  async findOneAndUpdate(filter: any, data: any, options: object): Promise<object | null> {
    return  this.stripeProductsDocumentModel.findOneAndUpdate(filter,data, options);
  }

  async createProductPrices(data: any): Promise<object | null> {
    return  this.stripeProductPricesDocumentModel.create(data);
  }

  async fetchProducts(): Promise<object | null> {
    return this.stripeProductsDocumentModel.aggregate([{
      $lookup: {
        from: 'stripe-product-prices',
        localField: 'product_id',
        foreignField: 'product_id',
        as: 'prices',
      },
    }
    ])
  }

}
