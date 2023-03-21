import {Command} from 'nestjs-command';
import {Injectable} from '@nestjs/common';
import {ProductsService} from '@/modules/products/products.service';

@Injectable()
export class StripeProductPricesSeed {
    constructor(private readonly productsService: ProductsService) {
    }

    @Command({
        command: 'create:stripe-product-prices',
        describe: 'create stripe-product-prices',
    })
    async create(): Promise<string | void> {
        await this.productsService.createProductsPrices({
                product_id: 'prod_NRzDirfFkErNca',
                price_id: 'price_1Mh5FUDxlCK0dx7rcZrtQrVv',
                price: 49,
                monthly: true,
                yearly: false
            }
        );

        await this.productsService.createProductsPrices({
                product_id: 'prod_NRzCvJC940JMox',
                price_id: 'price_1Mh5EVDxlCK0dx7rqVzfQ3DO',
                price: 29,
                monthly: true,
                yearly: false
            }
        );

        await this.productsService.createProductsPrices({
                product_id: 'prod_NRzBusBGuxPJKb',
                price_id: 'price_1Mh5ClDxlCK0dx7rPF6n28ka',
                price: 0,
                monthly: true,
                yearly: false
            }
        );

        await this.productsService.createProductsPrices({
                product_id: 'prod_N4mpaFXtrHMbwS',
                price_id: 'price_1MKdFeDxlCK0dx7rcvqQ9yvf',
                price: 59,
                monthly: true,
                yearly: false
            }
        );

        await this.productsService.createProductsPrices({
                product_id: 'prod_N4mpaFXtrHMbwS',
                price_id: 'price_1MKdFeDxlCK0dx7rWPEcaVLW',
                price: 637,
                monthly: false,
                yearly: true
            }
        );

        await this.productsService.createProductsPrices({
                product_id: 'prod_N4miyAhvpSUrjg',
                price_id: 'price_1MKd9CDxlCK0dx7rmrLJ6JS5',
                price: 19,
                monthly: true,
                yearly: false
            }
        );

        await this.productsService.createProductsPrices({
                product_id: 'prod_N4miyAhvpSUrjg',
                price_id: 'price_1MKd9CDxlCK0dx7rfcwE0Lfm',
                price: 109,
                monthly: false,
                yearly: true
            }
        );

        console.log('Stripe Product Prices Seeding Success');
    }
}
