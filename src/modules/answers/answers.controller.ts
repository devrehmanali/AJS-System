import {Body, Controller, Get, Post, Query, Req, UseGuards} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse, ApiQuery,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {
    ANSWER,
    BAD_REQUEST,
    DATA_FOUND, DATA_NOT_FOUND,
    INTERNAL_SERVER_ERROR,
    RESULT_STORED,
    UNAUTHRIZED,
    UNDEFINED
} from '@/constants/constants';
import {JwtAuthGuard} from '@auth/guards/jwt-auth.guard';
import {AnswersService} from '@/modules/answers/answers.service';
import {AnswersDto} from '@/modules/answers/dto/answers.dto';
import {UsersRepository} from '@users/users.repository';
import {TRUE_SELF_COMPLETE, TRUE_SELF_INCOMPLETE} from '@/constants/rabbitMqEvents';
import {RabbitMqService} from '@/modules/rabbit-mq/rabbit-mq.service';
import {PENDING} from '@/constants/coachStatusConstants';

@Controller('answers')
export class AnswersController {
    constructor(private readonly answersService: AnswersService,
                private readonly usersRepository: UsersRepository,
                private readonly rabbitMqService: RabbitMqService,) {
    }

    @ApiCreatedResponse({
        schema: {
            type: 'object',
            example:
                {status: 200, message: RESULT_STORED},

        },
        description: '200, return success message',
    })
    @ApiUnauthorizedResponse({
        schema: {
            type: 'object',
            example: {
                status: 401, message: UNAUTHRIZED,
            },
        },
        description: 'Token has been expired',
    })
    @ApiInternalServerErrorResponse({
        schema: {
            type: 'object',
            example: {
                status: 500,
                message: INTERNAL_SERVER_ERROR,
                answer: UNDEFINED
            },
        },
        description: '500: Internal Server Error',
    })
    @ApiBadRequestResponse({
        schema: {
            type: 'object',
            example:
                {
                    statusCode: 400,
                    message: [
                        "request must contain at least 7 elements"
                    ],
                    error: BAD_REQUEST
                },

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('submit-answer')
    async submitAnswer(@Req() req: any,
                       @Body() body: AnswersDto) {
        const res = {
            status: 400,
            message: BAD_REQUEST,
        }

        const result = await this.answersService.submitAnswer(req.user.email, body);
        if (result) {
            res.status = 200;
            res.message = RESULT_STORED;
        } else {
            res.status = 500;
            res.message = INTERNAL_SERVER_ERROR;
        }

        //check user submit all answers or not
        const submitAnswers = await this.answersService.fetchAnswers(req.user.email, body.role);

        const user = await this.usersRepository.findUserByEmail(req.user.email);

        //if all answers submitted then we will update it in users respective to its role
        if (submitAnswers.length >= 13 && body.role === 'user') {
            //add event into rabbitMQ Queue
            await this.rabbitMqService.eventEmitterOnRabbitMQ(TRUE_SELF_COMPLETE, {user_id: user?.user_id});
            await this.usersRepository.updateUser({email: req.user.email}, {is_user_assessment_completed: true});
        }

        if (submitAnswers.length >= 11 && body.role === 'coach') {
            //add event into rabbitMQ Queue
            await this.rabbitMqService.eventEmitterOnRabbitMQ(TRUE_SELF_COMPLETE, {user_id: user?.user_id});
            await this.usersRepository.updateUser({email: req.user.email}, {is_coach_assessment_completed: true});
        }

        return res;
    }


    @ApiCreatedResponse({
        schema: {
            type: 'object',
            example:
                {status: 200, message: DATA_FOUND, data: []},

        },
        description: '200, return success message',
    })
    @ApiUnauthorizedResponse({
        schema: {
            type: 'object',
            example: {
                status: 401, message: UNAUTHRIZED,
            },
        },
        description: 'Token has been expired',
    })
    @ApiInternalServerErrorResponse({
        schema: {
            type: 'object',
            example: {
                status: 500,
                message: INTERNAL_SERVER_ERROR,
                answer: UNDEFINED
            },
        },
        description: '500: Internal Server Error',
    })
    @ApiBadRequestResponse({
        schema: {
            type: 'object',
            example:
                {
                    statusCode: 400,
                    message: [
                        "request must contain at least 7 elements"
                    ],
                    error: BAD_REQUEST
                },

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @ApiQuery({
        name: "role",
        type: String,
        description: "send role for fetch questions against coach or user if you will not send then it will consider it as a user",
        required: false
    })
    @UseGuards(JwtAuthGuard)
    @Get('get-answer')
    async getAnswer(@Req() req: any,
                    @Query('role') role?: string,) {
        const res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
            data: [],
        }

        const result = await this.answersService.fetchAnswers(req.user.email, role);
        if (result && result.length > 0) {
            res.status = 200;
            res.message = DATA_FOUND;
            res.data = result
        } else {
            res.status = 200;
            res.message = DATA_NOT_FOUND;
        }

        return res;
    }


    //TODO for send answer third party app

    // @ApiCreatedResponse({
    //     schema: {
    //         type: 'object',
    //         example:
    //             {status: 200, message: RESULT_STORED},
    //
    //     },
    //     description: '200, return success message',
    // })
    // @ApiUnauthorizedResponse({
    //     schema: {
    //         type: 'object',
    //         example: {
    //             status: 401, message: UNAUTHRIZED,
    //         },
    //     },
    //     description: 'Token has been expired',
    // })
    // @ApiInternalServerErrorResponse({
    //     schema: {
    //         type: 'object',
    //         example: {
    //             status: 500,
    //             message: INTERNAL_SERVER_ERROR,
    //             answer: UNDEFINED
    //         },
    //     },
    //     description: '500: Internal Server Error',
    // })
    // @ApiBadRequestResponse({
    //     schema: {
    //         type: 'object',
    //         example:
    //             {
    //                 statusCode: 400,
    //                 message: [
    //                     "request must contain at least 7 elements"
    //                 ],
    //                 error: BAD_REQUEST
    //             },
    //
    //     },
    //     description: '400, return bad request error',
    // })
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    // @Post('submit-answer')
    // async submitAnswer(@Req() req: any,
    //                    @Body() body: AnswersDto) {
    //     const res = {
    //         status: 400,
    //         message: BAD_REQUEST,
    //     }
    //
    //     const result = await this.answersService.calculatingResult(req.user.email, body);
    //
    //     if (result) {
    //         res.status = 200;
    //         res.message = RESULT_STORED;
    //     } else {
    //         res.status = 500;
    //         res.message = INTERNAL_SERVER_ERROR;
    //     }
    //
    //     return res;
    // }
}
