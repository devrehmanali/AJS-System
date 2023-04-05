import { Body, Controller, Get, Put, Req, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { DATA_FOUND, DATA_NOT_FOUND, DATA_UPDATED, INTERNAL_SERVER_ERROR } from '@/constants/constants';
import { NotificationsService } from '@/modules/notifications/notifications.service';
import RequestWithUserInterface from '@interfaces/request-with-user.interface';
import { UpdateNotificationsUnseenStatusDto } from '@/modules/notifications/dto/update-notifications-unseen-status.dto';

@ApiTags('Notifications')
@Controller('notifications')
export class NotificationsController {
    constructor(private readonly notificationsService: NotificationsService) { }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example: {
                status: 200,
                message: "message",
                data: [{
                    _id: '',
                    user_id: '',
                    type: '',
                    message: '',
                    is_seen: false,
                    is_read: false
                }]
            },
        },
        description: '200, returns all notifications',
    })
    @ApiUnauthorizedResponse({
        schema: {
            type: 'object',
            example: {
                message: 'string',
            },
        },
        description: 'Token has been expired',
    })
    @ApiInternalServerErrorResponse({
        schema: {
            type: 'object',
            example: {
                message: 'string',
                details: {},
            },
        },
        description: 'InternalServerError',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get()
    async fetchNotifications(@Req() req: RequestWithUserInterface): Promise<object | undefined> {
        let res = {
            status: 200,
            message: DATA_NOT_FOUND,
            data: {}
        }
        const notifications = await this.notificationsService.findNotifications(req.user.email);
        if (notifications) {
            res.data = notifications;
            res.message = DATA_FOUND;
        }
        return res
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example: {
                status: 200,
                message: "message",
                data: {
                    count: 7
                }
            },
        },
        description: '200, returns all notifications',
    })
    @ApiUnauthorizedResponse({
        schema: {
            type: 'object',
            example: {
                message: 'string',
            },
        },
        description: 'Token has been expired',
    })
    @ApiInternalServerErrorResponse({
        schema: {
            type: 'object',
            example: {
                message: 'string',
                details: {},
            },
        },
        description: 'InternalServerError',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('unseen-notifications-count')
    async fetchUnSeenNotifications(@Req() req: RequestWithUserInterface): Promise<object | undefined> {
        let res = {
            status: 200,
            message: DATA_NOT_FOUND,
            data: {
                count: 0
            }
        }
        const unSeenNotificationsCount = await this.notificationsService.findUnSeenNotificationsCount(req.user.email);
        console.log(unSeenNotificationsCount)
        if (unSeenNotificationsCount) {
            res.data.count = unSeenNotificationsCount;
            res.message = DATA_FOUND;
        }
        return res
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example: {
                status: 200,
                message: DATA_UPDATED
            },
        },
        description: '200, update unseen notifications count notifications',
    })
    @ApiUnauthorizedResponse({
        schema: {
            type: 'object',
            example: {
                message: 'string',
            },
        },
        description: 'Token has been expired',
    })
    @ApiInternalServerErrorResponse({
        schema: {
            type: 'object',
            example: {
                message: 'string',
                details: {},
            },
        },
        description: 'InternalServerError',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put('update-notifications-seen-status')
    async updateNotificationsSeenStatus(@Body() data: UpdateNotificationsUnseenStatusDto): Promise<object | undefined> {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
        }
        const unSeenNotificationsCount = await this.notificationsService.updateUnSeenNotifications(data);
        console.log(unSeenNotificationsCount)
        if (unSeenNotificationsCount) {
            res.status = 200;
            res.message = DATA_UPDATED;
        }
        return res
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example: {
                status: 200,
                message: DATA_UPDATED
            },
        },
        description: '200, update read notifications count notifications',
    })
    @ApiUnauthorizedResponse({
        schema: {
            type: 'object',
            example: {
                message: 'string',
            },
        },
        description: 'Token has been expired',
    })
    @ApiInternalServerErrorResponse({
        schema: {
            type: 'object',
            example: {
                message: 'string',
                details: {},
            },
        },
        description: 'InternalServerError',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put('update-notifications-read-status')
    async updateNotificationsReadStatus(@Body() data: UpdateNotificationsUnseenStatusDto): Promise<object | undefined> {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
        }
        const unSeenNotificationsCount = await this.notificationsService.updateNotificationReadStatus(data);
        if (unSeenNotificationsCount) {
            res.status = 200;
            res.message = DATA_UPDATED;
        }
        return res
    }
}
