import {Body, Controller, Get, Param, Post, Put, Req, UseGuards} from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags,
    ApiUnauthorizedResponse
} from '@nestjs/swagger';
import {JwtAuthGuard} from '@auth/guards/jwt-auth.guard';
import RequestWithUserInterface from '@interfaces/request-with-user.interface';
import {CreateNylasSessionDto} from '@/modules/nylas/dto/create-nylas-session.dto';
import {NylasService} from '@/modules/nylas/nylas.service';
import {
    DATA_FOUND,
    DATA_NOT_FOUND,
    DATA_UPDATED,
    ERROR,
    INTERNAL_SERVER_ERROR,
    SUCCESSFULLY_SAVED
} from '@/constants/constants';
import {UpdateNylasSessionDto} from '@/modules/nylas/dto/update-nylas-session.dto';
import {AvailabilitiesDto} from '@/modules/nylas/dto/availabilities.dto';

@ApiTags('Nylas')
@Controller('nylas')
export class NylasController {
    constructor(private readonly nylasService: NylasService) {}

    @ApiOkResponse({
        schema: {
            type: 'object',
            example: {
                status: 200,
                message: SUCCESSFULLY_SAVED,
                data: {
                    "status": 200,
                    "message": "Successfully Saved",
                    "data": {
                        "user_id": "9fe21aed-d51f-4361-907b-94ae1b218d0a",
                        "customer_connect_account_id": "acct_1MZfUoD1f9oIMaVK",
                        "duration": 30,
                        "date": "2023-02-14T14:00:00.000Z",
                        "time": "2023-02-14T14:00:00.000Z",
                        "scope": "no scope",
                        "options": {
                            "nylasSessionRes": {
                                "account_id": "4t3lp0cfkrxzg538z8o6ppbd9",
                                "busy": true,
                                "calendar_id": "ac24ie6l6a1obvs9c2l1c31ti",
                                "customer_event_id": null,
                                "description": "ery",
                                "hide_participants": false,
                                "ical_uid": "e8aef2b7d84f47c78046ed9b6cb1f5a2@nylas.com",
                                "id": "7wpw8c8kre27h66rcy859yhjf",
                                "location": "",
                                "message_id": null,
                                "metadata": {
                                    "eventType": "One on One Session",
                                    "status": "PENDING"
                                },
                                "object": "event",
                                "organizer_email": "coach65coach@gmail.com",
                                "organizer_name": "coach65coach coach65coach",
                                "owner": "coach65coach coach65coach <coach65coach@gmail.com>",
                                "participants": [
                                    {
                                        "comment": null,
                                        "email": "user65user@gmail.com",
                                        "name": "user65user user65user",
                                        "phone_number": null,
                                        "status": "noreply"
                                    }
                                ],
                                "read_only": false,
                                "reminders": null,
                                "status": "confirmed",
                                "title": "ret",
                                "updated_at": 1676380660,
                                "visibility": null,
                                "when": {
                                    "end_time": 1676385000,
                                    "object": "timespan",
                                    "start_time": 1676383200
                                }
                            },
                            "groupsRes": {
                                "hasJoined": false,
                                "membersCount": 1,
                                "guid": "7wpw8c8kre27h66rcy859yhjf",
                                "name": "One on One0",
                                "type": "One on One Session",
                                "scope": "admin",
                                "conversationId": "group_7wpw8c8kre27h66rcy859yhjf",
                                "owner": "owner",
                                "joinedAt": 4387,
                                "createdAt": 4387
                            }
                        },
                        "price": "0",
                        "type": "One on One Session",
                        "is_active": "PENDING",
                        "created_by": "coach",
                        "coach_id": "643da8ac-cd3f-4fbe-9666-63556f7408c1",
                        "_id": "63eb89f4f67a7c6a59806845",
                        "createdAt": "2023-02-14T13:17:40.774Z",
                        "updatedAt": "2023-02-14T13:17:40.774Z",
                        "__v": 0
                    }
                }
            },
        },
        description: '200, returns success message after save event on nylas and our DB',
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
                status: 500,
                message: INTERNAL_SERVER_ERROR,
                data: {}
            },
        },
        description: 'InternalServerError',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    async createSessionNylas(@Req() req: RequestWithUserInterface,
                             @Body() data: CreateNylasSessionDto): Promise<object | undefined> {

        const response = {
            status: 500,
            message: INTERNAL_SERVER_ERROR,
            data: {}
        }
        const result = await this.nylasService.createNylasSessions(data)

        if (result) {
            response.status = 200;
            response.message = SUCCESSFULLY_SAVED;
            response.data = result;
        }

        return response;
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example: {
                status: 200,
                message: DATA_UPDATED,
            },
        },
        description: '200, returns success message after update event on nylas and our DB',
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
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put('update-nylas-session/:id')
    async updateSessionNylas(@Req() req: RequestWithUserInterface,
                             @Body() data: UpdateNylasSessionDto,
                             @Param('id') id: string): Promise<object | undefined> {

        const response = {
            status: 200,
            message: DATA_NOT_FOUND,
        }
        const result = await this.nylasService.updateNylasSessions(id, data)

        if (result && result != ERROR) {
            response.status = 200;
            response.message = DATA_UPDATED;
        } else if (result === ERROR) {
            response.status = 500;
            response.message = INTERNAL_SERVER_ERROR;
        }

        return response;
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example: {
                status: 200,
                message: DATA_FOUND,
                data: []
            },
        },
        description: '200, returns coach all events from nylas',
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
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('nylas-all-sessions')
    async allSessionsFromNylas(@Req() req: RequestWithUserInterface): Promise<object | undefined> {
        const response = {
            status: 200,
            message: DATA_NOT_FOUND,
            data: [],
        }
        const result = await this.nylasService.fetchNylasAllSessions(req.user.email)

        if (result) {
            response.message = DATA_FOUND;
            response.data = result.data
        }

        return response;
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example: {
                status: 200,
                message: DATA_FOUND,
                data: {}
            },
        },
        description: '200, returns availabilities from nylas',
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
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Put('get-availabilities')
    async getAvailabilities(@Req() req: RequestWithUserInterface,
                             @Body() data: AvailabilitiesDto): Promise<object | undefined> {
        const response = {
            status: 200,
            message: DATA_NOT_FOUND,
            data: {},
        }
        const result = await this.nylasService.getAvailabilities(req.user.email, data)

        if (result) {
            response.message = DATA_FOUND;
            response.data = result.data
        }

        return response;
    }

}
