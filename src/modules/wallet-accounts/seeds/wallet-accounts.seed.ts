import {Command} from 'nestjs-command';
import {Injectable} from '@nestjs/common';
import {WalletAccountsService} from '@/modules/wallet-accounts/wallet-accounts.service';
import {
  COACH_SUBSCRIPTION_REVENUE_WALLET,
  COACH_WITHDRAWAL_PAYABLE,
  COACHING_SESSION_EXPENSES,
  COACHING_SESSION_REVENUE_WALLET,
  ESCROW_ACCOUNT_WALLET,
  STRIPE_SUBSCRIPTION_FEE_WALLET,
  STRIPE_TRANSACTION_FEE,
  USER_REFUNDS_PAYABLE,
  USER_SUBSCRIPTION_REVENUE_WALLET,
  WELLAVI_CASH_WALLET
} from '@/constants/constants';

@Injectable()
export class WalletAccountsSeed {
  constructor(private readonly walletAccountsService: WalletAccountsService) {
  }

  @Command({
    command: 'create:wallet-account',
    describe: 'create wallet-account',
  })
  async create(): Promise<string | void> {
    await this.walletAccountsService.findOneAndUpdate({name: WELLAVI_CASH_WALLET} , {
      name: WELLAVI_CASH_WALLET,
      purpose: 'Represents main cash balance of Wellavi',
      type: 'Asset',
      wallet: 0
    });

    await this.walletAccountsService.findOneAndUpdate({name: COACH_SUBSCRIPTION_REVENUE_WALLET} , {
      name: COACH_SUBSCRIPTION_REVENUE_WALLET,
      purpose: 'Represents the amount of revenue earned from Coach subscriptions but not yet earned by the platform',
      type: 'Liability',
      wallet: 0
    });

    await this.walletAccountsService.findOneAndUpdate({name: USER_SUBSCRIPTION_REVENUE_WALLET} , {
      name: USER_SUBSCRIPTION_REVENUE_WALLET,
      purpose: 'Represents the amount of revenue earned from user subscriptions but not yet earned by the platform',
      type: 'Liability',
      wallet: 0
    });

    await this.walletAccountsService.findOneAndUpdate({name: COACHING_SESSION_REVENUE_WALLET} , {
      name: COACHING_SESSION_REVENUE_WALLET,
      purpose: 'Represents the amount of revenue earned by the platform from coaching sessions',
      type: 'Asset',
      wallet: 0
    });

    await this.walletAccountsService.findOneAndUpdate({name: ESCROW_ACCOUNT_WALLET} , {
      name: ESCROW_ACCOUNT_WALLET,
      purpose: 'Represents the funds held by the platform in escrow during coaching sessions',
      type: 'Asset',
      wallet: 0
    });

    await this.walletAccountsService.findOneAndUpdate({name: STRIPE_SUBSCRIPTION_FEE_WALLET} , {
      name: STRIPE_SUBSCRIPTION_FEE_WALLET,
      purpose: 'Represents the fees owed to Stripe by the platform for user and coach subscription payments',
      type: 'Liability',
      wallet: 0
    });

    await this.walletAccountsService.findOneAndUpdate({name: STRIPE_TRANSACTION_FEE} , {
      name: STRIPE_TRANSACTION_FEE,
      purpose: 'Represents the fees owed to Stripe by the platform for payment processing during coaching sessions',
      type: 'Liability',
      wallet: 0
    });

    await this.walletAccountsService.findOneAndUpdate({name: USER_REFUNDS_PAYABLE} , {
      name: USER_REFUNDS_PAYABLE,
      purpose: 'Represents the amount owed by the platform to users for refunds due to cancelled coaching sessions or other reasons',
      type: 'Liability',
      wallet: 0
    });

    await this.walletAccountsService.findOneAndUpdate({name: COACH_WITHDRAWAL_PAYABLE} , {
      name: COACH_WITHDRAWAL_PAYABLE,
      purpose: 'Represents the amount owed by the platform to coaches for withdrawals from their coach wallet',
      type: 'Liability',
      wallet: 0
    });

    await this.walletAccountsService.findOneAndUpdate({name: COACHING_SESSION_EXPENSES} , {
      name: COACHING_SESSION_EXPENSES,
      purpose: 'Represents the costs incurred by the platform during each coaching session, such as platform fees or payment processing fees',
      type: 'Liability',
      wallet: 0
    });

    await this.walletAccountsService.findOneAndUpdate({name: COACHING_SESSION_REVENUE_WALLET} , {
      name: COACHING_SESSION_REVENUE_WALLET,
      purpose: 'Represents the revenue earned by the platform from each coaching session',
      type: 'Asset',
      wallet: 0
    });

    console.log('Wallet Accounts Seeding Success');
  }
}
