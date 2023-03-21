import {Command} from 'nestjs-command';
import {Injectable} from '@nestjs/common';
import {ProductsService} from '@/modules/products/products.service';

@Injectable()
export class StripeProductsSeed {
  constructor(private readonly productsService: ProductsService) {
  }

  @Command({
    command: 'create:stripe-products',
    describe: 'create stripe-products',
  })
  async create(): Promise<string | void> {
     await this.productsService.findOneAndUpdate({product_id: 'prod_NRzDirfFkErNca'} , {
          product_id: 'prod_NRzDirfFkErNca',
          active: true,
          live_mode: false,
          metadata: {
            "feature_one": "Full access to all Coaching Tools",
            "feature_two": "10% Platform Fee for Sessions",
            "role": "coach"
          },
          name: "Tier 3",
        }
    );

     await this.productsService.findOneAndUpdate({product_id: 'prod_NRzCvJC940JMox'} , {
          product_id: 'prod_NRzCvJC940JMox',
          active: true,
          live_mode: false,
          metadata: {
            "feature_one": "Full access to all Coaching Tools",
            "feature_two": "15% Platform Fee for Sessions",
            "role": "coach"
          },
          name: "Self + Guided Coaching",
        }
    );

    await this.productsService.findOneAndUpdate({product_id: 'prod_NRzBusBGuxPJKb'} , {
          product_id: 'prod_NRzBusBGuxPJKb',
          active: true,
          live_mode: false,
          metadata: {
            "feature_one": "Full access to all coaching tools ",
            "feature_two": "20% Platform Fee for Sessions",
            "role": "coach"
          },
          name: "Self coaching",
        }
    );

    await this.productsService.findOneAndUpdate({product_id: 'prod_N4mpaFXtrHMbwS'} , {
          product_id: 'prod_N4mpaFXtrHMbwS',
          active: true,
          live_mode: false,
          metadata: {
            "feature_one": "<b>Full access to all Self-</b>Coaching content and challenges",
            "feature_two": "<b>$50 in Monthly Credits</b> for Guided Coaching",
            "role": "user"
          },
          name: "Self + Guided Coaching",
        }
    );

    await this.productsService.findOneAndUpdate({product_id: 'prod_N4miyAhvpSUrjg'} , {
          product_id: 'prod_N4miyAhvpSUrjg',
          active: true,
          live_mode: false,
          metadata: {
            "feature_one": "<b>Full access to all Self-</b>Coaching content and challenges.",
            "feature_two": "<b>pay as you go pricing</b> for Guided Coaching",
            "role": "user"
          },
          name: "Self coaching",
        }
    );

    console.log('Stripe Products Seeding Success');
  }
}
