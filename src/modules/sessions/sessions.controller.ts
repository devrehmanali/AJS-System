import {Body, Controller, Get, Param, Post, Put, Query, Req, UseGuards} from '@nestjs/common';
import {SessionsService} from '@/modules/sessions/sessions.service';
import {
    ApiBadRequestResponse, ApiBearerAuth,
    ApiInternalServerErrorResponse, ApiOkResponse, ApiQuery, ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {
    BAD_REQUEST,
    DATA_FOUND,
    DATA_NOT_FOUND,
    DATA_UPDATED,
    FEEDBACK_SUCCESSFULLY,
    FEEDBACK_UN_SUCCESSFULLY,
    INTERNAL_SERVER_ERROR,
    SUCCESSFULLY_SAVED,
} from '@/constants/constants';
import {JwtAuthGuard} from '@auth/guards/jwt-auth.guard';
import {FeedbackDto} from '@/modules/stripe/dto/feedback.dto';
import RequestWithUserInterface from '@interfaces/request-with-user.interface';
import {StripeService} from '@/modules/stripe/stripe.service';
import {CreateSessionDto} from '@/modules/sessions/dto/create-session.dto';
import {UpdateSessionDto} from '@/modules/sessions/dto/update-session.dto';

@ApiTags('Sessions')
@Controller('sessions')
export class SessionsController {
    constructor(private readonly sessionsService: SessionsService) {
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example:
                {status: 200, message: SUCCESSFULLY_SAVED},

        },
        description: '201, return success message after create sessions',
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
        description: '500: Internal Server Error',
    })
    @ApiBadRequestResponse({
        schema: {
            type: 'object',
            example:
                {"status": 400, "message": "string"},

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('create-sessions')
    async createSessions(@Req() req: any,
                         @Body() data: CreateSessionDto,) {
        const res = {
            status: 400,
            message: BAD_REQUEST,
        }
        const result = await this.sessionsService.storeSessions(req.user.email, data);
        if (result) {
            res.message = SUCCESSFULLY_SAVED;
            res.status = 200
        }
        return res
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example:
                {status: 200, message: DATA_FOUND, data: []},

        },
        description: '201, return all data for upcoming sessions',
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
        description: '500: Internal Server Error',
    })
    @ApiBadRequestResponse({
        schema: {
            type: 'object',
            example:
                {"status": 400, "message": "string"},

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('upcoming-sessions/:role')
    async upcomingSessions(@Req() req: any,
                           @Param('role') role: string) {
        const res = {
            status: 200,
            message: DATA_NOT_FOUND,
            data: []
        }
        const upcomingSessionResult = await this.sessionsService.fetchUpcomingSessions(req.user.email, role);
        if (upcomingSessionResult.length > 0) {
            res.message = DATA_FOUND;
            res.data = upcomingSessionResult
        }
        return res
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example:
                {status: 200, message: DATA_FOUND, data: []},

        },
        description: '201, return all data for requested sessions',
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
        description: '500: Internal Server Error',
    })
    @ApiBadRequestResponse({
        schema: {
            type: 'object',
            example:
                {"status": 400, "message": "string"},

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('sessions-request/:role')
    async findSessionsRequest(@Req() req: RequestWithUserInterface,
                              @Param('role') role: string) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
            data: []
        }
        let result = await this.sessionsService.fetchSessionsRequests(req.user.email, 'PENDING', role);
        if (result.length > 0) {
            res.status = 200;
            res.message = DATA_FOUND;
            res.data = result
        } else {
            res.status = 200;
            res.message =  DATA_NOT_FOUND
        }
        return res
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example:
                {status: 200, message: DATA_FOUND, data: {}},

        },
        description: '201, return session by id',
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
        description: '500: Internal Server Error',
    })
    @ApiBadRequestResponse({
        schema: {
            type: 'object',
            example:
                {"status": 400, "message": "string"},

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('session-by-id/:id')
    async findSessionsById(@Req() req: RequestWithUserInterface,
                              @Param('id') id: string) {
        let res = {
            status: 200,
            message: DATA_NOT_FOUND,
            data: {}
        }
        let result = await this.sessionsService.fetchSessionById(id);
        if (result) {
            res.status = 200;
            res.message = DATA_FOUND;
            res.data = result[0]
        } else {
            res.status = 200;
            res.message =  DATA_NOT_FOUND
        }
        return res
    }


    // @ApiOkResponse({
    //     schema: {
    //         type: 'object',
    //         example:
    //             {status: 200, message: FEEDBACK_SUCCESSFULLY},
    //
    //     },
    //     description: '201, return success message after save user feedback',
    // })
    // @ApiUnauthorizedResponse({
    //     schema: {
    //         type: 'object',
    //         example: {
    //             status: 401, message: 'string',
    //         },
    //     },
    //     description: 'Token has been expired',
    // })
    // @ApiInternalServerErrorResponse({
    //     schema: {
    //         type: 'object',
    //         example: {
    //             status: 500,
    //             message: 'string'
    //         },
    //     },
    //     description: '500: Internal Server Error',
    // })
    // @ApiBadRequestResponse({
    //     schema: {
    //         type: 'object',
    //         example:
    //             {"status": 400, "message": "string"},
    //
    //     },
    //     description: '400, return bad request error',
    // })
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    // @Post('post-user-feedBack/:session_id')
    // async userFeedback(@Req() req: RequestWithUserInterface,
    //                    @Body() data: FeedbackDto,
    //                    @Param('session_id') sessionId: string,) {
    //     let res = {
    //         status: 500,
    //         message: FEEDBACK_UN_SUCCESSFULLY,
    //     }
    //     let result = await this.sessionsService.storeUserFeedback(req.user.email, data, sessionId);
    //     if (result) {
    //         res.status = 200;
    //         res.message = FEEDBACK_SUCCESSFULLY;
    //     }
    //     return res
    // }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example:
                {status: 200, message: DATA_FOUND, data: []},

        },
        description: '201, return users feedback',
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
        description: '500: Internal Server Error',
    })
    @ApiBadRequestResponse({
        schema: {
            type: 'object',
            example:
                {"status": 400, "message": "string"},

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('fetch-user-feedback')
    async findUsersFeedback(@Req() req: RequestWithUserInterface) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
            data: []
        }
        let result = await this.sessionsService.fetchUserFeedback(req.user.email);
        if (result.length > 0) {
            res.status = 200;
            res.message = DATA_FOUND;
            res.data = result
        } else {
            res.status = 200;
            res.message =  DATA_NOT_FOUND
        }
        return res
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example:
                {status: 200, message: DATA_FOUND, data: []},

        },
        description: '201, return pending feedback',
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
        description: '500: Internal Server Error',
    })
    @ApiBadRequestResponse({
        schema: {
            type: 'object',
            example:
                {"status": 400, "message": "string"},

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('fetch-pending-feedBack')
    async findPendingFeedback(@Req() req: RequestWithUserInterface) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
            data: []
        }
        let result = await this.sessionsService.fetchUsersPendingFeedback(req.user.email);
        if (result.length > 0) {
            res.status = 200;
            res.message = DATA_FOUND;
            res.data = result
        } else {
            res.status = 200;
            res.message =  DATA_NOT_FOUND
        }
        return res
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example:
                {status: 200, message: DATA_UPDATED},

        },
        description: '200, return success message',
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
        description: '500: Internal Server Error',
    })
    @ApiBadRequestResponse({
        schema: {
            type: 'object',
            example:
                {"status": 400, "message": "string"},

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('handle-session-request/:session_id/:type')
    async handleSessionRequest(@Req() req: RequestWithUserInterface,
                               @Param('session_id') sessionId: string,
                               @Param('type') type: string,) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
        }
        const data = {
            is_active: type
        }

        let result = await this.sessionsService.updateSessionRequest(sessionId, data);
        if (result != 'error') {
            res.status = 200;
            res.message = DATA_UPDATED;
        }

        return res
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example:
                {status: 200, message: DATA_UPDATED},

        },
        description: '200, return success message',
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
        description: '500: Internal Server Error',
    })
    @ApiBadRequestResponse({
        schema: {
            type: 'object',
            example:
                {"status": 400, "message": "string"},

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('handle-session-request-coach/:id/:type')
    async handleSessionRequestCoach(@Req() req: RequestWithUserInterface,
                               @Param('id') id: string,
                               @Param('type') type: string,) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
        }
        const data = {
            is_active: type
        }

        let result = await this.sessionsService.updateSessionRequestCoach(id, data);
        if (result != 'error') {
            res.status = 200;
            res.message = DATA_UPDATED;
        }

        return res
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example:
                {status: 200, message: DATA_UPDATED},

        },
        description: '200, return success message after update session',
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
        description: '500: Internal Server Error',
    })
    @ApiBadRequestResponse({
        schema: {
            type: 'object',
            example:
                {"status": 400, "message": "string"},

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put('update-session/:session_id')
    async updateSession(@Req() req: RequestWithUserInterface,
                        @Param('session_id') sessionId: string,
                        @Body() data: UpdateSessionDto) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
        }
        let result = await this.sessionsService.updateSessionRequest(sessionId, data);

        if (result) {
            res.status = 200;
            res.message = DATA_UPDATED;
        }

        return res
    }

    // @ApiOkResponse({
    //     schema: {
    //         type: 'object',
    //         example:
    //             {status: 200, message: DATA_FOUND, data: {}},
    //
    //     },
    //     description: '201, return last 30 days completed sessions list',
    // })
    // @ApiUnauthorizedResponse({
    //     schema: {
    //         type: 'object',
    //         example: {
    //             status: 401, message: 'string',
    //         },
    //     },
    //     description: 'Token has been expired',
    // })
    // @ApiInternalServerErrorResponse({
    //     schema: {
    //         type: 'object',
    //         example: {
    //             status: 500,
    //             message: 'string'
    //         },
    //     },
    //     description: '500: Internal Server Error',
    // })
    // @ApiBadRequestResponse({
    //     schema: {
    //         type: 'object',
    //         example:
    //             {"status": 400, "message": "string"},
    //
    //     },
    //     description: '400, return bad request error',
    // })
    // @ApiBearerAuth()
    // @UseGuards(JwtAuthGuard)
    // @Get('session-count')
    // async sessionCount(@Req() req: any) {
    //     const res = {
    //         status: 200,
    //         message: DATA_NOT_FOUND,
    //         data: {}
    //     }
    //     const upcomingSessionResult = await this.sessionsService.fetchSessionsCount(req.user.email);
    //     if (upcomingSessionResult.length > 0) {
    //         res.message = DATA_FOUND;
    //         res.data = upcomingSessionResult
    //     }
    //     return res
    // }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example:
                {status: 200, message: DATA_FOUND, data: []},

        },
        description: '201, return all data for upcoming sessions',
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
        description: '500: Internal Server Error',
    })
    @ApiBadRequestResponse({
        schema: {
            type: 'object',
            example:
                {"status": 400, "message": "string"},

        },
        description: '400, return bad request error',
    })
    @ApiQuery({
        name: "sort",
        type: String,
        description: "sorting query parameter. Optional",
        required: false
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('sessions-report/:type/:role')
    async sessionsReport(@Req() req: RequestWithUserInterface,
    @Param('type') type: string,
    @Param('role') role: string,
    @Query('sort') sort?: string,){
        const res = {
            status: 200,
            message: DATA_NOT_FOUND,
            data: []    
        }
        const upcomingSessionResult = await this.sessionsService.fetchSessionsWithFilters(req.user.email, type, role, sort);
        if (upcomingSessionResult && upcomingSessionResult.length > 0) {
            res.message = DATA_FOUND;
            res.data = upcomingSessionResult
        }
        return res
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example:
                {status: 200, message: DATA_FOUND, data: {}},

        },
        description: '201, return coach data ',
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
        description: '500: Internal Server Error',
    })
    @ApiBadRequestResponse({
        schema: {
            type: 'object',
            example:
                {"status": 400, "message": "string"},

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('user-nylas-data/:connect_account_id')
    async findUserDataForNylas(@Req() req: RequestWithUserInterface,
                              @Param('connect_account_id') connectAccountId: string) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
            data: {}
        }
        let result = await this.sessionsService.fetchUserDataForNylas(connectAccountId);
        if (result) {
            res.status = 200;
            res.message = DATA_FOUND;
            res.data = result
        } else {
            res.status = 200;
            res.message =  DATA_NOT_FOUND
        }
        return res
    }
}
