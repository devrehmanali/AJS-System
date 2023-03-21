import {Body, Controller, Delete, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {
    ApiBadRequestResponse, ApiBearerAuth,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from "@nestjs/swagger";
import {
    BAD_REQUEST, DATA_FOUND, DATA_NOT_FOUND,
    FOLLOWED,
    INTERNAL_SERVER_ERROR,
    UN_FOLLOWED
} from "@/constants/constants";
import {JwtAuthGuard} from "@auth/guards/jwt-auth.guard";
import {FollowRequestService} from "@/modules/follow-request/follow-request.service";
import {DeleteFollowersDto} from '@/modules/follow-request/dto/delete-followers.dto';

@ApiTags('Follow Request')
@Controller('follow-request')
export class FollowRequestController {
    constructor(private readonly followRequestService: FollowRequestService) {
    }

    @ApiCreatedResponse({
        schema: {
            type: 'object',
            example:
                {"status": 200, "message": FOLLOWED},

        },
        description: '200, return all data for profile',
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
                {"status": 400, "message": BAD_REQUEST},

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('/:user_id')
    async createFollowRequest(@Req() req: any,
                  @Param('user_id') userId: string,) {
        const res = {
            status: 400,
            message: BAD_REQUEST
        }
        const result = await this.followRequestService.createFollowRequest(req.user.email,userId);
        if (result) {
            res.status = 200;
            res.message = FOLLOWED;
        } else {
            res.status = 500;
            res.message = INTERNAL_SERVER_ERROR
        }
        return res;
    }

    @ApiCreatedResponse({
        schema: {
            type: 'object',
            example:
                {"status": 200, "message": UN_FOLLOWED},

        },
        description: '200, return all data for profile',
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
                {"status": 400, "message": BAD_REQUEST},

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete('delete-followers')
    async deleteFollowers(@Req() req: any,
                          @Body() reqBody: DeleteFollowersDto,) {
        const res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR
        }
        const result = await this.followRequestService.deleteFollowRequest(req.user.email,reqBody);
        console.log(result)
        if (result?.deletedCount > 0) {
            res.status = 200;
            res.message = UN_FOLLOWED;
        } else {
            res.status = 400;
            res.message = BAD_REQUEST
        }
        return res;
    }

    @ApiCreatedResponse({
        schema: {
            type: 'object',
            example:
                {"status": 200, "message": UN_FOLLOWED},

        },
        description: '200, return all data for profile',
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
                {"status": 400, "message": BAD_REQUEST},

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Delete('/:user_id')
    async deleteFollowRequest(@Req() req: any,
                        @Param('user_id') userId: string,) {
        const res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR
        }
        const result = await this.followRequestService.deleteFollower(req.user.email,userId);
        if (result?.deletedCount === 1) {
            res.status = 200;
            res.message = UN_FOLLOWED;
        } else {
            res.status = 400;
            res.message = BAD_REQUEST
        }
        return res;
    }

    @ApiCreatedResponse({
        schema: {
            type: 'object',
            example:
                {"status": 200, "message": 'string', "is_following": true},

        },
        description: '200, return if following true or false',
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
                {"status": 400, "message": BAD_REQUEST},

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('is-following/:user_id')
    async isFollowing(@Req() req: any,
                              @Param('user_id') userId: string,) {
        const res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
            is_following: false
        }
        const result = await this.followRequestService.isFollowing(req.user.email,userId);
        if (result) {
            res.status = 200;
            res.message = 'Following';
            res.is_following = true;
        } else {
            res.status = 400;
            res.message = 'Not Following'
        }
        return res;
    }

    @ApiCreatedResponse({
        schema: {
            type: 'object',
            example:
                {"status": 200, "message": 'string', "data": []},

        },
        description: '200, return followers data',
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
                message: 'string',
                data: []
            },
        },
        description: '500: Internal Server Error',
    })
    @ApiBadRequestResponse({
        schema: {
            type: 'object',
            example:
                {"status": 400, "message": BAD_REQUEST, "data": []},

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('followers')
    async followersList(@Req() req: any) {
        const res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
            data: []
        }
        const result = await this.followRequestService.fetchFollowersList(req.user.email);
        if (result.length > 0) {
            res.status = 200;
            res.message = DATA_FOUND;
            res.data = result;
        } else {
            res.status = 400;
            res.message = DATA_NOT_FOUND
        }

        return res;
    }

    @ApiCreatedResponse({
        schema: {
            type: 'object',
            example:
                {"status": 200, "message": 'string', "data": []},

        },
        description: '200, return followings data',
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
                message: 'string',
                data: []
            },
        },
        description: '500: Internal Server Error',
    })
    @ApiBadRequestResponse({
        schema: {
            type: 'object',
            example:
                {"status": 400, "message": BAD_REQUEST, "data": []},

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('followings')
    async followingsList(@Req() req: any) {
        const res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
            data: []
        }
        const result = await this.followRequestService.fetchFollowingsList(req.user.email);
        if (result.length > 0) {
            res.status = 200;
            res.message = DATA_FOUND;
            res.data = result;
        } else {
            res.status = 400;
            res.message = DATA_NOT_FOUND
        }

        return res;
    }
}
