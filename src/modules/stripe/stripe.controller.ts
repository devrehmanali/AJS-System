import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiBody,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import RequestWithUserInterface from "@interfaces/request-with-user.interface";
import {
    ARCHIVED_SUCCESSFULLY,
    DATA_DELETED,
    DATA_FOUND,
    DATA_NOT_FOUND,
    DATA_UPDATED, FEEDBACK_SUCCESSFULLY,
    INTERNAL_SERVER_ERROR, PAYMENT_NOT_SUCCESSFULLY, PAYMENT_SUCCESSFULLY, PAYMENT_UPDATED_DEFAULT, SUBSCRIBED,
    SUCCESSFULLY_SAVED
} from "@/constants/constants";
import { StripeService } from "@/modules/stripe/stripe.service";
import { AddCardDto } from "@/modules/stripe/dto/add-card.dto";
import { JwtAuthGuard } from "@auth/guards/jwt-auth.guard";
import { UpdatePaymentMethodDto } from "@/modules/stripe/dto/update-payment-method.dto";
import { DeleteCardDto } from "@/modules/stripe/dto/delete-card.dto";
import { CheckoutDto } from "@/modules/stripe/dto/checkout.dto";
import { CreateSubscriptionDto } from '@/modules/stripe/dto/create-subscription.dto';
import { UpdatePaymentMethodDefaultDto } from '@/modules/stripe/dto/update-payment-method-default.dto';
import { FeedbackDto } from '@/modules/stripe/dto/feedback.dto';

@ApiTags('Stripe Integration')
@Controller('stripe')
export class StripeController {
    constructor(private readonly stripeService: StripeService) {
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: AddCardDto })
    @Post('add-card-details')
    async createCustomer(@Req() req: RequestWithUserInterface,
        @Body() data: AddCardDto) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
            data: {}
        }
        let result = await this.stripeService.createCard(req, data);
        if (result) {
            res.status = 200;
            res.message = SUCCESSFULLY_SAVED;
            res.data = result;
        }
        return res
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('get-card-details')
    async getCustomers(@Req() req: RequestWithUserInterface) {
        let res = {
            status: 200,
            message: DATA_NOT_FOUND,
            data: {}
        }
        let result = await this.stripeService.getPaymentMethods(req);
        if (result) {
            res.status = 200;
            res.message = DATA_FOUND;
            res.data = result;
        }
        return res
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('fetch-default-card')
    async fetchDefaultCard(@Req() req: RequestWithUserInterface) {
        let res = {
            status: 200,
            message: DATA_NOT_FOUND,
            data: {}
        }
        let result = await this.stripeService.getCustomerFromStripe(req);
        if (result) {
            res.status = 200;
            res.message = DATA_FOUND;
            res.data = result;
        }
        return res
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: DeleteCardDto })
    @Post('delete-card')
    async deletePaymentMethod(@Body() data: DeleteCardDto) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
            data: {}
        }
        let result = await this.stripeService.deletePaymentMethod(data);
        if (result) {
            res.status = 200;
            res.message = DATA_DELETED;
            res.data = {};
        }
        return res
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('update-card-details')
    async updatePaymentMethod(@Body() data: UpdatePaymentMethodDto) {
        let res = {
            status: 200,
            message: DATA_NOT_FOUND,
            data: {}
        }
        let result = await this.stripeService.updatePaymentMethods(data);
        if (result) {
            res.status = 200;
            res.message = DATA_UPDATED;
            res.data = result;
        }
        return res
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('get-products')
    async getProducts() {
        let res = {
            status: 200,
            message: DATA_NOT_FOUND,
            data: {}
        }
        let result = await this.stripeService.getProducts();
        if (result) {
            res.status = 200;
            res.message = DATA_FOUND;
            res.data = result;
        }
        return res
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete('archive-product/:id')
    async archiveProduct(@Param('id') id: string,) {
        let res = {
            status: 400,
            message: DATA_NOT_FOUND,
            data: {}
        }
        let result = await this.stripeService.archiveProduct(id);
        if (result) {
            res.status = 200;
            res.message = ARCHIVED_SUCCESSFULLY;
            res.data = result;
        }
        return res
    }

    @ApiOkResponse({
        schema: {
            type: 'array',
            example:
                { status: 200, message: DATA_FOUND, data: [] },
        },
        description: '200, Retrieve All connect accounts',
    })
    @ApiUnauthorizedResponse({
        schema: {
            type: 'object',
            example: {
                status: 401, message: 'string',
            },
        },
        description: 'Token has been expired',
    })
    @ApiInternalServerErrorResponse({
        schema: {
            type: 'object',
            example: {
                status: 500,
                message: 'string'
            },
        },
        description: 'Internal Server Error',
    })
    @ApiBadRequestResponse({
        schema: {
            type: 'object',
            example:
                { "status": 400, "message": "string" },

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('retrieve-connect-accounts')
    async retrieveConnectAccount() {
        let res = {
            status: 200,
            message: DATA_NOT_FOUND,
            data: {}
        }
        let result = await this.stripeService.fetchConnectAccount();
        if (result) {
            res.status = 200;
            res.message = DATA_UPDATED;
            res.data = result;
        }
        return res
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('create-subscription')
    async createSubscription(@Req() req: RequestWithUserInterface,
        @Body() data: CreateSubscriptionDto) {
        let res = {
            status: 400,
            message: DATA_NOT_FOUND,
            data: {}
        }
        let result = await this.stripeService.createSubscription(data, req);
        if (result) {
            res.status = 200;
            res.message = SUBSCRIBED;
            res.data = result;
        }
        return res
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('checkout')
    async checkout(@Req() req: RequestWithUserInterface,
        @Body() data: CheckoutDto) {
        let res = {
            status: 500,
            message: PAYMENT_NOT_SUCCESSFULLY,
        }
        let result = await this.stripeService.checkout(req.user.email, data);
        if (result) {
            res.status = 200;
            res.message = PAYMENT_SUCCESSFULLY;
        }
        return res
    }


    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('fetch-plans')
    async getPlanByUser(@Req() req: RequestWithUserInterface) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
            data: {},
        };
        const user = await this.stripeService.fetchPlanByUser(req.user.email);
        if (user) {
            res.status = 200;
            res.data = user;
            res.message = DATA_FOUND;
        } else {
            res.status = 400;
            res.message = DATA_NOT_FOUND;
        }
        return res;
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('update-card-as-default')
    async updatePaymentMethodAsDefault(@Body() data: UpdatePaymentMethodDefaultDto) {
        let res = {
            status: 200,
            message: DATA_NOT_FOUND,
        }
        let result = await this.stripeService.updatePaymentMethodsAsDefault(data);
        if (result) {
            res.status = 200;
            res.message = PAYMENT_UPDATED_DEFAULT;
        }
        return res
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('feedBack/:session_id')
    async feedBack(@Req() req: RequestWithUserInterface,
        @Body() data: FeedbackDto,
        @Param('session_id') sessionId: string,) {
        let res = {
            status: 500,
            message: PAYMENT_NOT_SUCCESSFULLY,
        }
        let result = await this.stripeService.storeFeedback(req.user.email, data, sessionId);
        if (result) {
            res.status = 200;
            res.message = FEEDBACK_SUCCESSFULLY;
        }
        return res
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('earnings-balance')
    async getEarningsBalance(@Req() req: RequestWithUserInterface) {
        let res = {
            status: 200,
            message: DATA_FOUND,
            data: [
                {
                    id: 1,
                    name: 'Available',
                    amount: 0
                },
                {
                    id: 2,
                    name: 'Pending',
                    amount: 0
                },
                {
                    id: 3,
                    name: 'Total Paid out',
                    amount: 0
                }
            ],
        };
        //available balance function
        const availableBalance = await this.stripeService.getCurrentBalance(req.user.email);

        if (availableBalance) {
            availableBalance.available.map((item: any) => {
                res.data[0].amount = res.data[0].amount + item.amount
            })
        }

        //pending balance code
        const pendingBalance = await this.stripeService.getCurrentBalance(req.user.email);
        if (pendingBalance) {
            pendingBalance.pending.map((item: any) => {
                res.data[1].amount = res.data[1].amount + item.amount
            })
        }

        //paid out balance code
        const payoutsBalance = await this.stripeService.getTotalPayouts(req.user.email);
        if (payoutsBalance) {
            const payoutTotal = payoutsBalance?.data.length ? payoutsBalance?.data.reduce((prev: any, item: any) => {
                return prev + item.amount
            }, 0) : 0;
            res.data[2].amount = payoutTotal / 100
        }
        return res;
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('get-available-balance')
    async getAvailableBalance(@Req() req: RequestWithUserInterface) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
            data: {
                availableBalance: 0
            },
        };
        const currentBalance = await this.stripeService.getCurrentBalance(req.user.email);
        if (currentBalance) {
            currentBalance.available.map((data: any) => {
                data.availableBalance = data.availableBalance + data.amount
            })
            res.status = 200;
            res.message = DATA_FOUND;
        } else {
            res.status = 400;
            res.message = DATA_NOT_FOUND;
        }
        return res;
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('get-pending-balance')
    async getPendingBalance(@Req() req: RequestWithUserInterface) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
            data: {
                pendingBalance: 0
            },
        };
        const currentBalance = await this.stripeService.getCurrentBalance(req.user.email);
        if (currentBalance) {
            currentBalance.pending.map((data: any) => {
                data.pendingBalance = data.pendingBalance + data.amount
            })
            res.status = 200;
            res.message = DATA_FOUND;
        } else {
            res.status = 400;
            res.message = DATA_NOT_FOUND;
        }
        return res;
    }

    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('get-total-payouts')
    async getTotalPayouts(@Req() req: RequestWithUserInterface) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
            data: {
                payouts: 0
            },
        };
        const payoutsBalance = await this.stripeService.getTotalPayouts(req.user.email);
        if (payoutsBalance) {
            const payoutTotal = payoutsBalance?.data.length ? payoutsBalance?.data.reduce((prev: any, item: any) => {
                return prev + item.amount
            }, 0) : 0
            res.status = 200;
            res.data.payouts = payoutTotal / 100;
            res.message = DATA_FOUND;
        } else {
            res.status = 400;
            res.message = DATA_NOT_FOUND;
        }

        return res;
    }
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('get-transaction-report')
    async getPayoutTransactionsReport(@Req() req: RequestWithUserInterface) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
            data: [],
        };
        const payouts = await this.stripeService.getTotalPayouts(req.user.email);
        if (payouts) {
            const transactions = payouts?.data.length ? payouts?.data.map((item: any) => {
                return {
                    amount: item?.amount,
                    description: item?.description,
                    type: item?.type,
                    method: item?.method,
                    created: item?.created,
                }
            }) : []
            res.status = 200;
            res.data = transactions;
            res.message = DATA_FOUND;
        } else {
            res.status = 400;
            res.message = DATA_NOT_FOUND;
        }

        return res;
    }

}

