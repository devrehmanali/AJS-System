import {
  Body,
  Controller,
  createParamDecorator,
  Get,
  Param,
  Post,
  Put, Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from '@users/users.service';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOkResponse, ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import RequestWithUserInterface from '@interfaces/request-with-user.interface';
import { UpdateUserDto } from '@users/dto/update-user.dto';
import { UpdateUserPasswordDto } from '@users/dto/update-user-password.dto';
import * as bcrypt from 'bcrypt';
import { AuthService } from '@auth/auth.service';
import {
  DATA_FOUND,
  DATA_NOT_FOUND,
  DATA_UPDATED,
  INTERNAL_SERVER_ERROR,
  INVALID_PASSWORD,
} from '@/constants/constants';
import { array, boolean, object } from 'joi';
import RequestUserInterface from '@/interfaces/request-user.interface';
import { User } from '@/decorators/user.decorator';
import axios from 'axios';
import { google } from 'googleapis';
import { UpdateCoachStatusDto } from '@users/dto/update-coach-status.dto';

@ApiTags('Users')
@Controller('users')
export class UsersController {
  constructor(private readonly userService: UsersService) { }

  @ApiOkResponse({
    schema: {
      type: 'object',
      example:
        { "status": 200, "message": DATA_UPDATED },
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
        { "status": 400, "message": "string" },

    },
    description: '400, return bad request error',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateUserDto })
  @Put('update-user')
  async updateUser(@Req() req: RequestWithUserInterface,
    @Body() data: UpdateUserDto) {
    let res = {
      status: 500,
      message: INTERNAL_SERVER_ERROR
    }
    // @ts-ignore
    let result = await this.userService.updateUser({ email: req.user.email }, data, req, {
      email: req.user.email,
      first_name: req.user.first_name,
      last_name: req.user.last_name
    });

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
        { "status": 200, "message": DATA_UPDATED },
    },
    description: '200, update coach status',
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
  @ApiBody({ type: UpdateCoachStatusDto })
  @Put('update-coach-status')
  async updateCoachStatus(@Body() data: UpdateCoachStatusDto) {
    let res = {
      status: 500,
      message: INTERNAL_SERVER_ERROR
    }
    // @ts-ignore
    let result = await this.userService.updateCoachStatusByEmail(data);
    if (result) {
      res.status = 200;
      res.message = DATA_UPDATED;
    }
    return res
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      example: { status: 200, message: DATA_UPDATED },
    },
    description: '200, update settings',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        status: 401,
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
        message: 'string',
      },
    },
    description: 'Internal Server Error',
  })
  @ApiBadRequestResponse({
    schema: {
      type: 'object',
      example: { status: 400, message: 'string' },
    },
    description: '400, return bad request error',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: UpdateUserPasswordDto })
  @Put('update-password')
  async updatePassword(
    @Req() req: RequestWithUserInterface,
    @Body() data: UpdateUserPasswordDto,
  ) {
    let res = {
      status: 500,
      message: INTERNAL_SERVER_ERROR,
    };

    let user = await this.userService.findUserByEmail(req.user.email);
    if (
      user &&
      (await bcrypt.compare(data.old_password, user.password ?? ''))
    ) {
      let obj = {
        password: await AuthService.hashPassword(data.password),
      };
      let result = await this.userService.updateUser(
        { email: req.user.email },
        obj,
      );
      if (result) {
        res.status = 200;
        res.message = DATA_UPDATED;
      }
    } else {
      res.status = 400;
      res.message = 'wrong password';
    }
    return res;
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      example: {
        status: 200,
        message: 'message',
        data: {
          _id: 'string',
          user_id: 'string',
          first_name: 'string',
          last_name: 'string',
          email: 'string',
          role: [],
          isLoggedIn: true,
        },
      },
    },
    description: '200, returns user data',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        status: 401,
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
        message: 'string',
        details: {},
      },
    },
    description: 'Internal Server Error',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get()
  async fetchUserByEmail(@Req() req: RequestWithUserInterface) {
    let res = {
      status: 200,
      message: DATA_NOT_FOUND,
      data: {},
    };
    const user = await this.userService.findUserByEmail(req.user.email);
    if (user) {
      res.data = user;
      res.message = DATA_FOUND;
    } else {
      res.status = 500;
    }
    return res;
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      example: {
        status: 200,
        message: 'message',
        data: {
          _id: 'string',
          user_id: 'string',
          first_name: 'string',
          last_name: 'string',
          email: 'string',
          role: [],
          isLoggedIn: true,
        },
      },
    },
    description: '200, returns all users data',
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
  @ApiQuery({
    name: "page",
    type: String,
    description: "current page number it will start with 0",
    required: true
  })
  @ApiQuery({
    name: "limit",
    type: String,
    description: "rows on one page",
    required: true
  })
  @Get('all-users')
  async fetchAllUsers(@Query('page') page?: string,
    @Query('limit') limit?: string) {
    let res = {
      status: 200,
      message: DATA_NOT_FOUND,
      data: [],
    };
    const user = await this.userService.fetchAllUsers(page || '0', limit || '10');
    if (user.length > 0) {
      res.data = user;
      res.message = DATA_FOUND;
    }
    return res;
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      example: {
        status: 200,
        message: 'message',
        data: {
          _id: 'string',
          user_id: 'string',
          first_name: 'string',
          last_name: 'string',
          email: 'string',
          role: [],
          isLoggedIn: true,
        },
      },
    },
    description: '200, returns user data',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        status: 401,
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
        message: 'string',
        details: {},
      },
    },
    description: 'Internal Server Error',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('user-by-id/:user_id')
  async findUserByUserId(@Param('user_id') userId: string) {
    let res = {
      status: 500,
      message: INTERNAL_SERVER_ERROR,
      data: {},
    };
    const user = await this.userService.findUserByUserId(userId);
    if (user) {
      res.data = user;
      res.message = DATA_FOUND;
    } else {
      res.status = 400;
      res.message = DATA_NOT_FOUND;
    }
    return res;
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      example: {
        status: 200,
        message: 'message',
        data: [
          {
            _id: 'string',
            user_id: 'string',
            first_name: 'string',
            last_name: 'string',
            email: 'string',
            role: [],
            isLoggedIn: true,
          },
        ],
      },
    },
    description: '200, returns user data',
  })
  @ApiUnauthorizedResponse({
    schema: {
      type: 'object',
      example: {
        status: 401,
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
        message: 'string',
        details: {},
      },
    },
    description: 'Internal Server Error',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('coach-list')
  async listAllCoaches(@Req() req: RequestWithUserInterface) {
    let res = {
      status: 500,
      message: INTERNAL_SERVER_ERROR,
      data: {},
    };
    const user = await this.userService.fetchAllCoaches(req.user.email);
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

  @ApiBody({ type: array })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/availability')
  async putAvailability(
    @Req() req: RequestWithUserInterface,
    @Body() availabilities: any,
  ) {
    //@ts-ignore
    let result = await this.userService.updateUser({ email: req.user.email }, { availabilities }, req);

    return {
      success: true,
    };
  }

  // @UseGuards(JwtAuthGuard)
  @Post('/create-token')
  async createToken(@Body() body: any) {
    let code = body?.code;
    let response;
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_NYLAS_CLIENT_ID,
      process.env.GOOGLE_NYLAS_CLIENT_SECRET,
      'https://wellavi-web1.herokuapp.com/settings',
    );

    console.log(
      process.env.GOOGLE_NYLAS_CLIENT_ID,
      process.env.GOOGLE_NYLAS_CLIENT_SECRET,
    );

    try {
      response = await oauth2Client.getToken(code);
    } catch (err) {
      response = err;
    }

    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('/availability')
  async getAvailability(@Req() req: RequestWithUserInterface) {
    let userData = await this.userService.findUserByEmail(req.user.email);
    return {
      user: userData,
    };
  }
}
