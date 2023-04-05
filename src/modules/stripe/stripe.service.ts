import { Injectable } from '@nestjs/common';
import { UsersService } from "@users/users.service";
import { DeleteCardDto } from "@/modules/stripe/dto/delete-card.dto";
import { CreateSubscriptionDto } from '@/modules/stripe/dto/create-subscription.dto';
import { StripeRepository } from '@/modules/stripe/stripe.repository';
import { UpdatePaymentMethodDefaultDto } from '@/modules/stripe/dto/update-payment-method-default.dto';
import { ProductsService } from '@/modules/products/products.service';
import {
    ASSET,
    COACH,
    COACH_SUBSCRIPTION_REVENUE_WALLET,
    COACH_WALLET, COACH_WITHDRAWAL_PAYABLE,
    COACHING_SESSION_EXPENSES,
    CREDIT,
    DEBIT,
    ESCROW_ACCOUNT_WALLET,
    STRIPE_SUBSCRIPTION_FEE_WALLET,
    STRIPE_TRANSACTION_FEE,
    USER,
    USER_SUBSCRIPTION_REVENUE_WALLET,
    USER_WALLET,
    WELLAVI_CASH_WALLET
} from '@/constants/constants';

@Injectable()
export class StripeService {
    constructor(private usersService: UsersService,
        private stripeRepository: StripeRepository,
        private productsService: ProductsService,
    ) {
    }

    async createCard(req: any, data: object): Promise<object | null> {
        const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
        let customer;
        let stripe_customer_id = '';

        const user = req.user;
        // @ts-ignore
        const email = req.user.email;
        const userData = await this.usersService.findUserByEmail(email);

        // @ts-ignore
        if (!userData.stripe_customer_id || userData.stripe_customer_id === undefined || userData.stripe_customer_id === null) {
            // Create a Customer on stripe:
            customer = await this.createCustomerOnStripe(email, user.first_name);
            const updateUser = await this.usersService.updateByEmail(email, { stripe_customer_id: customer.id });
            stripe_customer_id = customer.id;
        } else {
            // @ts-ignore
            stripe_customer_id = userData.stripe_customer_id;
        }

        //create new payment Method
        const paymentMethod = await stripe.paymentMethods.create({
            type: 'card',
            card: {
                // @ts-ignore
                number: data.card_number,
                // @ts-ignore
                exp_month: data.expiry_month,
                // @ts-ignore
                exp_year: data.expiry_year,
                // @ts-ignore
                cvc: data.cvc,
            },
        });

        //Attach new created payment method with customer
        const paymentMethodAttach = await stripe.paymentMethods.attach(
            paymentMethod.id,
            // @ts-ignore
            { customer: stripe_customer_id }
        );
        return paymentMethod;
    }

    async getPaymentMethods(req: object): Promise<object | null> {
        const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
        // @ts-ignore
        const email = req.user.email;
        const userData = await this.usersService.findUserByEmail(email);

        // Get all payment methods against customer
        const paymentMethods = await stripe.customers.listPaymentMethods(userData?.stripe_customer_id, { type: 'card' });
        return paymentMethods;
    }

    async getCustomerFromStripe(req: object): Promise<object | null> {
        const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
        // @ts-ignore
        const email = req.user.email;
        const userData = await this.usersService.findUserByEmail(email);

        // Get customer from stripe
        const customerResult = await stripe.customers.retrieve(userData?.stripe_customer_id);

        if (customerResult.invoice_settings.default_payment_method) {
            const paymentMethod = await stripe.paymentMethods.retrieve(
                customerResult.invoice_settings.default_payment_method
            );
            return paymentMethod;
        }
        return null
    }

    async deletePaymentMethod(data: DeleteCardDto): Promise<object | null> {
        const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

        const paymentMethod = await stripe.paymentMethods.detach(
            data.payment_id
        );
        return paymentMethod;
    }

    async updatePaymentMethods(req: object): Promise<object | null> {
        const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
        const paymentMethod = await stripe.paymentMethods.update(
            // @ts-ignore
            req.payment_method_id,
            {
                card: {
                    // @ts-ignore
                    exp_month: req.expiry_month,
                    // @ts-ignore
                    exp_year: req.expiry_year
                }
            }
        );
        return paymentMethod;
    }

    async getProducts(): Promise<object | null> {
        // const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
        //
        // // Get all products
        // const products = await stripe.products.list();

        //get products from our DB
        return await this.productsService.findProducts();
    }

    async fetchConnectAccount(): Promise<object | null> {
        const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

        return await stripe.accounts.list();
    }

    async archiveProduct(id: string): Promise<object | null> {
        const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

        const product = await stripe.products.update(id, { active: false });

        return product;
    }

    async createCustomerOnStripe(email: string, first_name: string): Promise<any> {
        const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
        return await stripe.customers.create({
            // source: 'to k_mastercard',
            email: email,
            name: first_name
        });
    }

    async createSubscription(body: CreateSubscriptionDto, req: any): Promise<object | null> {
        const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

        // @ts-ignore
        const email = req.user.email;
        const userData = await this.usersService.findUserByEmail(email);
        const user_id = userData?.user_id;

        const subscription = await stripe.subscriptions.create({
            customer: body.customer_id,
            items: [
                { price: body.item_price },
            ],
        });

        //check who purchase subscription user or coach then update that type of role balance
        const data = {
            user_id: user_id,
            subscription_id: subscription.id,
            start_time: subscription.current_period_start,
            end_time: subscription.current_period_end
        }
        //When subscription will create then store it in our database
        const storeDataInDB = await this.stripeRepository.create(data);

        return storeDataInDB;
    }

    async checkout(email: string, data: any): Promise<any> {
        const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

        //convert dollars into cents
        data.price = data.price * 100;

        // Create a PaymentIntent:
        const paymentIntent = await stripe.paymentIntents.create({
            amount: data.price,
            currency: 'usd',
        });

        //get user id
        const userData = await this.usersService.findUserByEmail(email);
        const userId = userData?.user_id;

        //After Payments Insert it in our DB and return response
        data.user_id = userId;
        data.payment_intent_id = paymentIntent.id;
        data.is_active = 'PENDING'

        const storeDataInDB = await this.stripeRepository.createSessions(data);

        return storeDataInDB
    }

    async fetchPlanByUser(email: string): Promise<object | null> {
        const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

        const userData = await this.usersService.findUserByEmail(email);
        // @ts-ignore
        const user_id = userData.user_id;

        const getResult = await this.stripeRepository.findPlans(user_id);

        if (!getResult) {
            return null;
        } else {
            //get subscription against user
            const subscription = await stripe.subscriptions.retrieve(
                getResult.subscription_id
            );

            //get product detail against subscription
            const product = await stripe.products.retrieve(
                subscription.items.data[0].plan.product
            );
            return product;
        }
    }

    async updatePaymentMethodsAsDefault(data: UpdatePaymentMethodDefaultDto): Promise<object | null> {
        const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
        const customer = await stripe.customers.update(
            data.customer_id,
            { invoice_settings: { default_payment_method: data.payment_id } }
        );
        return customer;
    }

    async storeFeedback(email: string, data: any, sessionId: string) {
        let storingData = {}
        if (data.type === 'coach') {
            storingData = {
                coach_feedback: data.feedback,
                is_active: 'APPROVED',
                connect_transfer_id: ''
            }
        } else {
            storingData = {
                user_feedback: data.feedback,
                is_active: 'APPROVED',
                connect_transfer_id: ''
            }
        }

        //get user id
        const userData = await this.usersService.findUserByEmail(email);
        const userId = userData?.user_id;

        const { Types: { ObjectId: ObjectId } } = require("mongoose");
        const sessionObjectId = ObjectId(sessionId)
        // find Approved sessions against user
        const userSession = await this.stripeRepository.findApprovedSessions(sessionObjectId);
        if (userSession) {
            if (data.type === 'coach' && userSession.user_feedback) {
                const responseAfterPayment = await this.createPaymentOnStripe(userSession)
                //filtered data to store in DB
                storingData = {
                    coach_feedback: data.feedback,
                    is_active: 'COMPLETED',
                    connect_transfer_id: responseAfterPayment.id
                }
                await this.updateWalletAfterPayment(userSession)

            } else if (data.type === 'user' && userSession.coach_feedback) {
                const responseAfterPayment = await this.createPaymentOnStripe(userSession)
                //filtered data to store in DB
                storingData = {
                    user_feedback: data.feedback,
                    is_active: 'COMPLETED',
                    connect_transfer_id: responseAfterPayment.id
                }
                await this.updateWalletAfterPayment(userSession)
            }

            const filter = {
                _id: ObjectId(userSession._id)
            }

            const storeInDB = await this.stripeRepository.updateSession(filter, storingData);
            return storeInDB
        } else {
            return null;
        }
    }

    async getCurrentBalance(email: string): Promise<any> {
        const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

        const userData = await this.usersService.findUserByEmail(email);
        // @ts-ignore
        const { stripe_link_account_id } = userData;
        const balance = await stripe.balance.retrieve(
            {
                stripeAccount: stripe_link_account_id
            })

        return balance
    }

    async getTotalPayouts(email: string): Promise<any | null> {
        const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

        const userData = await this.usersService.findUserByEmail(email);
        // @ts-ignore
        const { stripe_link_account_id } = userData;

        let connectPayouts = await stripe.payouts.list(
            {
                stripeAccount: stripe_link_account_id
            })
        return connectPayouts
    }

    async createPaymentOnStripe(userSession: any) {
        const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
        const subscriptionData = await this.stripeRepository.findPlans(userSession.coach_id);
        const subscriptionId = subscriptionData.subscription_id

        //retrieve subscription detail
        const subscriptionPlanDetail = await this.fetchSubscriptionPlanById(subscriptionId)
        const wellaviFee = await this.calculateWellaviPercentageFee(subscriptionPlanDetail.plan.amount)

        //Calculating percentage of application fee in cents
        const applicationFee = ((userSession.price * wellaviFee) / 100) * 100

        // After create payment intent we need to confirm it
        const paymentIntentConfirm = await stripe.paymentIntents.confirm(
            userSession.payment_intent_id,
            { payment_method: 'pm_card_visa' }
        );
        // Create a Transfer to the connected account (later):
        const transfer = await stripe.transfers.create({
            amount: (userSession.price * 100) - applicationFee,
            currency: 'usd',
            destination: userSession.customer_connect_account_id,
        });
        return transfer
    }

    async fetchSubscriptionPlanById(subscriptionId: any) {
        const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
        return await stripe.subscriptions.retrieve(
            subscriptionId
        );
    }

    async calculateWellaviPercentageFee(planPrice: any) {
        //wellavi fee in percent
        let wellaviFee = 20
        if (planPrice === 2900) {
            wellaviFee = 15
        } else if (planPrice === 4900) {
            wellaviFee = 10
        }
        return wellaviFee
    }

    async userLedger(userWallet: any, planAmount: number, userSubscriptionRevenueWallet: any) {
        //stripe processing fee 2.9% + 0.30 transaction fee
        let stripeFee = process.env.STRIPE_SUBSCRIPTION_FEE || 0
        let stripeTransactionFee = process.env.STRIPE_Transaction_FEE || 0
        stripeFee = parseFloat(stripeFee.toString())
        stripeTransactionFee = parseFloat(stripeTransactionFee.toString())
        //calculate stripe fee
        stripeFee = ((planAmount * stripeFee) / 100) + stripeTransactionFee

        let wellaviWalletAmount = 0;
        if (planAmount === 19) {
            wellaviWalletAmount = planAmount - stripeFee // 19 - 2 = 17
        } else if (planAmount === 59) {
            wellaviWalletAmount = planAmount - stripeFee - 50 // 59 - 2 - 50 = 7
        } else {
            wellaviWalletAmount = planAmount - stripeFee // 49 - 1.72 = 47.27
        }


        return true;
    }

    async updateWalletAfterPayment(userSessionData: any) {
        //stripe processing fee 2.9% + 0.30 transaction fee
        let stripeFee = process.env.STRIPE_SUBSCRIPTION_FEE || 0
        let stripeTransactionFee = process.env.STRIPE_Transaction_FEE || 0
        stripeFee = parseFloat(stripeFee.toString())
        stripeTransactionFee = parseFloat(stripeTransactionFee.toString())
        //calculate stripe fee
        stripeFee = ((userSessionData.price * stripeFee) / 100) + stripeTransactionFee

        const subscriptionData = await this.stripeRepository.findPlans(userSessionData.coach_id);
        const subscriptionId = subscriptionData.subscription_id
        //retrieve subscription detail
        const subscriptionPlanDetail = await this.fetchSubscriptionPlanById(subscriptionId)
        const wellaviPercentage = await this.calculateWellaviPercentageFee(subscriptionPlanDetail.plan.amount)

        //Calculating percentage of application fee in dollar
        const wellaviFee = (userSessionData.price * wellaviPercentage) / 100

        return true;
    }

}
