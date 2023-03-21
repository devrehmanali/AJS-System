import {
    Body,
    Controller, Get, Post, Put, Req, UseGuards,
} from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBearerAuth, ApiBody,
    ApiInternalServerErrorResponse,
    ApiOkResponse,
    ApiTags, ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {SettingService} from './setting.service';
import {JwtAuthGuard} from "@auth/guards/jwt-auth.guard";
import {GeneralSettingDto} from "@/modules/setting/dto/general-setting.dto";
import RequestWithUserInterface from "@interfaces/request-with-user.interface";
import {object} from "joi";
import {UpdateLocationSettingDto} from "@/modules/setting/dto/update-location-setting.dto";
import {UpdateSubscriptionSettingDto} from "@/modules/setting/dto/update-subscription-setting.dto";
import {UpdateNotificationSettingDto} from "@/modules/setting/dto/update-notification-setting.dto";
import {UpdateCalenderSettingDto} from "@/modules/setting/dto/update-calender-setting.dto";
import {personalizationSettingDto} from "@/modules/setting/dto/personalization-setting.dto";
import {UpdateSecuritySettingDto} from "@/modules/setting/dto/update-security-setting.dto";
import {DATA_FOUND, DATA_NOT_FOUND, DATA_UPDATED, INTERNAL_SERVER_ERROR} from "@/constants/constants";

@ApiTags('Settings')
@Controller('coach-settings')
export class SettingController {
    constructor(private readonly settingService: SettingService) {
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example:
                {"status": 200, "message": DATA_UPDATED},
        },
        description: '200, update settings',
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
    @ApiBody({type: UpdateLocationSettingDto})
    @Put('update-location')
    async updateLocationSetting(@Req() req: RequestWithUserInterface,
                                @Body() data: UpdateLocationSettingDto) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR
        }
        let result = await this.settingService.updateSettings(req.user.email, data);
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
                {"status": 200, "message": DATA_UPDATED},
        },
        description: '200, update settings',
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
    @ApiBody({type: UpdateSubscriptionSettingDto})
    @Put('update-subscription')
    async updateSubscription(@Req() req: RequestWithUserInterface,
                             @Body() data: UpdateSubscriptionSettingDto) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR
        }
        let result = await this.settingService.updateSettings(req.user.email, data);
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
                {"status": 200, "message": DATA_UPDATED},
        },
        description: '200, update settings',
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
    @ApiBody({type: UpdateNotificationSettingDto})
    @Put('update-notification')
    async updateNotification(@Req() req: RequestWithUserInterface,
                             @Body() data: UpdateNotificationSettingDto) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR
        }
        let result = await this.settingService.updateSettings(req.user.email, data);
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
                {"status": 200, "message": DATA_UPDATED},
        },
        description: '200, update settings',
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
    @ApiBody({type: UpdateSecuritySettingDto})
    @Put('update-security')
    async updateSecurity(@Req() req: RequestWithUserInterface,
                         @Body() data: UpdateSecuritySettingDto) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR
        }
        let result = await this.settingService.updateSettings(req.user.email, data);
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
                {"status": 200, "message": DATA_UPDATED},
        },
        description: '200, update settings',
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
    @ApiBody({type: UpdateCalenderSettingDto})
    @Put('update-calender-sync')
    async updateCalender(@Req() req: RequestWithUserInterface,
                         @Body() data: UpdateCalenderSettingDto) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR
        }
        let result = await this.settingService.updateSettings(req.user.email, data);
        if (result) {
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
                message: "message",
                data: {
                    country: "string",
                    city: "string",
                    phone_number: "string",
                    postal_code: "string",
                    street_address: "string",
                    email: "string",
                    timezone: "string",
                    subscription: "string",
                    payment_method: [
                        "string"
                    ],
                    calender: "string",
                    notification_setting: {}
                }
            },
        },
        description: '200, return data',
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
                details: {},
            },
        },
        description: 'Internal Server Error',
    })
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Post()
    async fetchSettings(@Req() req: RequestWithUserInterface,
                        @Body() data: any) {
        let res = {
            status: 200,
            message: DATA_NOT_FOUND,
            data: {}
        }
        const row = await this.settingService.fetchSettings(req.user.email, data);
        if (row) {
            res.data = row;
            res.message = DATA_FOUND;
        } else {
            res.status = 500;
        }
        return res;
    }

    @ApiOkResponse({
        schema: {
            type: 'object',
            example:
                {"status": 200, "message": DATA_UPDATED},
        },
        description: '200, update settings',
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
    @ApiBody({type: personalizationSettingDto})
    @Put('update-personal-info')
    async updatePersonalInfo(@Req() req: RequestWithUserInterface,
                         @Body() data: personalizationSettingDto) {
        let res = {
            status: 500,
            message: INTERNAL_SERVER_ERROR
        }
        let result = await this.settingService.updateSettings(req.user.email, data);
        if (result) {
            res.status = 200;
            res.message = DATA_UPDATED;
        }
        return res
    }

}
