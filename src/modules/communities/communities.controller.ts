import {Body, Controller, Delete, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {
    ApiBadRequestResponse, ApiBearerAuth,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse, ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {BAD_REQUEST, DATA_FOUND, DATA_NOT_FOUND, SUCCESSFULLY_DELETED, SUCCESSFULLY_SAVED} from '@/constants/constants';
import {JwtAuthGuard} from '@auth/guards/jwt-auth.guard';
import {CommunitiesService} from '@/modules/communities/communities.service';
import {CreateCommunityDto} from '@/modules/communities/dto/create-community.dto';
import {CreateCommunityMembersDto} from '@/modules/communities/dto/create-community-members.dto';

@ApiTags('Communities')
@Controller('communities')
export class CommunitiesController {
    constructor(private readonly communitiesService: CommunitiesService) {
    }

    @ApiCreatedResponse({
        schema: {
            type: 'object',
            example:
                {status: 201, message: SUCCESSFULLY_SAVED, data: {}},

        },
        description: '201, return success message after save community',
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
    @Post()
    async createCommunity(@Req() req: any,
                  @Body() reqBody: CreateCommunityDto) {
        const response = {
            status: 400,
            message: BAD_REQUEST,
            data: {}
        }
        const result = await this.communitiesService.createCommunity(reqBody, req.user.email);
        if (result) {
            response.status = 200;
            response.message = SUCCESSFULLY_SAVED;
            response.data = result
        }
        return response
    }

    @ApiCreatedResponse({
        schema: {
            type: 'object',
            example:
                {"status": 201, "message": SUCCESSFULLY_SAVED},

        },
        description: '201, return success message after save community',
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
    @Post('add-members')
    async addCommunityMembers(@Body() reqBody: CreateCommunityMembersDto) {
        const response = {
            status: 400,
            message: BAD_REQUEST
        }
        const result = await this.communitiesService.addCommunityMembers(reqBody);

        if (result) {
            response.status = 200;
            response.message = SUCCESSFULLY_SAVED;
        }
        return response
    }

    @ApiCreatedResponse({
        schema: {
            type: 'object',
            example:
                {"status": 201, "message": SUCCESSFULLY_DELETED},

        },
        description: '201, return success message after delete community',
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
    @Delete('delete-community/:community_id')
    async deleteCommunity(@Param('community_id') communityId: string,) {
        const response = {
            status: 400,
            message: BAD_REQUEST
        }
        const result = await this.communitiesService.deleteCommunity(communityId);

        if (result) {
            response.status = 200;
            response.message = SUCCESSFULLY_DELETED;
        }
        return response
    }

    @ApiCreatedResponse({
        schema: {
            type: 'object',
            example:
                {status: 201, message: DATA_FOUND, data: []},

        },
        description: '201, return communities with its members count',
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
    @Get('get-communities')
    async getCommunities(@Req() req: any,) {
        const response = {
            status: 400,
            message: BAD_REQUEST,
            data: []
        }
        const result = await this.communitiesService.fetchCommunities(req.user.email);

        if (result.length > 0) {
            response.status = 200;
            response.message = DATA_FOUND;
            response.data = result;
        } else {
            response.status = 200;
            response.message = DATA_NOT_FOUND;
        }
        return response
    }

    @ApiCreatedResponse({
        schema: {
            type: 'object',
            example:
                {status: 201, message: DATA_FOUND, data: []},

        },
        description: '201, return community detail with members count and members detail',
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
    @Get('get-community-by-id/:community_id')
    async getCommunityById(@Req() req: any,
                           @Param('community_id') communityId: string,) {
        const response = {
            status: 400,
            message: BAD_REQUEST,
            data: []
        }
        const result = await this.communitiesService.fetchCommunityById(communityId);

        if (result.length > 0) {
            response.status = 200;
            response.message = DATA_FOUND;
            response.data = result;
        } else {
            response.status = 200;
            response.message = DATA_NOT_FOUND;
        }
        return response
    }

    @ApiCreatedResponse({
        schema: {
            type: 'object',
            example:
                {"status": 201, "message": SUCCESSFULLY_DELETED},

        },
        description: '201, return success message after delete community',
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
    @Delete('delete-community-member/:community_id/:user_id')
    async deleteCommunityMember(@Param('community_id') communityId: string,
                          @Param('user_id') userId: string) {
        const response = {
            status: 400,
            message: BAD_REQUEST
        }
        const result = await this.communitiesService.deleteCommunityMember(communityId, userId);

        if (result) {
            response.status = 200;
            response.message = SUCCESSFULLY_DELETED;
        }
        return response
    }
}
