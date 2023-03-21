import { Injectable } from '@nestjs/common';
import {ProductsRepository} from '@/modules/products/products.repository';

@Injectable()
export class ProductsService {
    constructor(private readonly productsRepository: ProductsRepository) {}

    async findOneAndUpdate(filter: any, data: any): Promise<object | null> {
        return  this.productsRepository.findOneAndUpdate(filter, data, {
            new: true,
            upsert: true // Make this update into an upsert
        });
    }

    async createProductsPrices(data: any): Promise<object | null> {
        return  this.productsRepository.createProductPrices(data);
    }

    async findProducts(): Promise<object | null> {
        return  this.productsRepository.fetchProducts();
    }
}
