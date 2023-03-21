import {Controller, Get, Param, Post, Body, Req, UseGuards, Query, Put} from '@nestjs/common';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import RequestWithUserInterface from '@/interfaces/request-with-user.interface';
import {
    ApiBadRequestResponse, ApiBearerAuth, ApiBody,
    ApiInternalServerErrorResponse,
    ApiOkResponse, ApiQuery, ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { publicationPostDto } from './dto/publicaiotnsPost.dto';
import { PublicationsService } from './publications.service';
import {
    INTERNAL_SERVER_ERROR,
    SUCCESSFULLY_SAVED, DATA_FOUND, DATA_NOT_FOUND, DATA_UPDATED
} from '@/constants/constants';
import {UpdatePublicationDto} from '@/modules/publications/dto/update-publication.dto';

@ApiTags('Publications')
@Controller('publications')
export class PublicationsController {
    constructor(private readonly publicationsService: PublicationsService) { }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example:
            {
                status: 200,
                message: SUCCESSFULLY_SAVED
            },
        },
        description: '200, Return success message after post publication',
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
            {
                status: 400,
                message: "Bad Http Request"
            },

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: publicationPostDto })
    @Post()
    async createPublication(@Req() req: RequestWithUserInterface,
        @Body() data: publicationPostDto) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
        }
        let result = await this.publicationsService.savePublication(req?.user?.email, data)

        if (result) {
            res.status = 200;
            res.message = SUCCESSFULLY_SAVED;
        }

        return res
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example:
                {
                    status: 200,
                    message: DATA_UPDATED
                },
        },
        description: '200, Return success message after update post',
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
                {
                    status: 400,
                    message: "Bad Http Request"
                },

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @ApiBody({ type: UpdatePublicationDto })
    @Put('update-publication/:id')
    async updatePublication(@Req() req: RequestWithUserInterface,
                            @Param('id') id: string,
                            @Body() data: UpdatePublicationDto) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
        }
        let result = await this.publicationsService.updatePublication(id, data)

        if (result) {
            res.status = 200;
            res.message = DATA_UPDATED;
        }

        return res
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example:
                {
                    status: 200,
                    data: [],
                    message: DATA_FOUND,
                },
        },
        description: '200, Return all posts and filtererd post as well',
    })
    @ApiUnauthorizedResponse({
        schema: {
            type: 'object',
            example: {
                status: 401, message: 'No User Found',
            },
        },
        description: 'Token has been expired',
    })
    @ApiInternalServerErrorResponse({
        schema: {
            type: 'object',
            example: {
                status: 500,
                message: 'Internal Server Error'
            },
        },
        description: 'Internal Server Error',
    })
    @ApiBadRequestResponse({
        schema: {
            type: 'object',
            example:
                {
                    status: 400,
                    message: "Bad Rquest Error"
                },

        },
        description: '400, return bad request error',
    })
    @ApiQuery({
        name: "type",
        type: String,
        description: "Show published type",
        required: false
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('publications/:type')
    async fetchPublications(@Req() req: RequestWithUserInterface,
                            @Query('type') type?: string) {
        let res = {
            status: 400,
            data:{},
            message: DATA_NOT_FOUND,
        }
        let result = await this.publicationsService.fetchPublications(req.user.email, type)
        if (result) {
            res.status = 200;
            res.data = result
            res.message = DATA_FOUND;
        }

        return res
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example:
            {
                status: 200,
                data: {},
                message: DATA_FOUND,
            },
        },
        description: '200, Return success message after post review',
    })
    @ApiUnauthorizedResponse({
        schema: {
            type: 'object',
            example: {
                status: 401, message: 'No User Found',
            },
        },
        description: 'Token has been expired',
    })
    @ApiInternalServerErrorResponse({
        schema: {
            type: 'object',
            example: {
                status: 500,
                message: 'Internal Server Error'
            },
        },
        description: 'Internal Server Error',
    })
    @ApiBadRequestResponse({
        schema: {
            type: 'object',
            example:
            {
                status: 400,
                message: "Bad Rquest Error"
            },

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post('get-publications/:user_id')
    async getPublications(@Req() req: RequestWithUserInterface,
                           @Param('user_id') user_id:string) {
        let res = {
            status: 400,
            data:{},
            message: DATA_NOT_FOUND,
        }
        let result = await this.publicationsService.getPublications(user_id)
        if (result) {
            res.status = 200;
            res.data = result
            res.message = DATA_FOUND;
        }
        
        return res
    }
}
