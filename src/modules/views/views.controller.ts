import {Body, Controller, Param, Put, Req, UseGuards} from '@nestjs/common';
import {ViewsService} from '@/modules/views/views.service';
import {
    ApiBadRequestResponse, ApiBearerAuth, ApiBody,
    ApiInternalServerErrorResponse,
    ApiOkResponse, ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {DATA_POSTED, DATA_UPDATED, INTERNAL_SERVER_ERROR} from '@/constants/constants';
import {JwtAuthGuard} from '@auth/guards/jwt-auth.guard';
import {UpdateCalenderSettingDto} from '@/modules/setting/dto/update-calender-setting.dto';
import RequestWithUserInterface from '@interfaces/request-with-user.interface';

@ApiTags('Views')
@Controller('views')
export class ViewsController {
    constructor(private readonly viewsService: ViewsService) {}

    @ApiOkResponse({
        schema: {
            type: 'object',
            example:
                {"status": 200, "message": DATA_POSTED},
        },
        description: '200, add or update view against coach',
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
                {"status": 400, "message": "string"},

        },
        description: '400, return bad request error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put('post-view/:viewer_id')
    async postView(@Req() req: RequestWithUserInterface,
                         @Param('viewer_id') viewerId: string) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR
        }
        let result = await this.viewsService.postView(req.user.email, viewerId);
        if (result) {
            res.status = 200;
            res.message = DATA_POSTED;
        }
        return res
    }
}
