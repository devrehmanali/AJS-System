import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CreateProfileDto } from './dto/create-profile.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { ProfileService } from './profile.service';
import {
  DATA_FOUND,
  DATA_NOT_FOUND,
  DATA_UPDATED,
  INTERNAL_SERVER_ERROR,
  SUCCESSFULLY_SAVED,
} from '@/constants/constants';
import { CreateUserProfileDto } from '@/modules/profile/dto/create-user-profile.dto';
import { UpdateUserProfileDto } from '@/modules/profile/dto/update-user-profile.dto';
import { UploadCertificatesDto } from '@/modules/profile/dto/upload-certificates.dto';
import { UpdateProfileUserSideDto } from '@/modules/profile/dto/update-profile-user-side.dto';
import { UploadIntroVideoDto } from './dto/upload-intro-video.dto';

@ApiTags('Profile')
@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @ApiCreatedResponse({
    schema: {
      type: 'object',
      example: { status: 201, message: SUCCESSFULLY_SAVED },
    },
    description: '201, return all data for profile',
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
    description: '500: Internal Server Error',
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
  @Post()
  createProfile(@Req() req: any, @Body() reqBody: CreateProfileDto) {
    return this.profileService.createProfile(reqBody, req.user.email);
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      example: {
        status: 200,
        message: 'message',
        data: {
          title: 'string',
          experience: [],
          education: [],
          language: [],
          about: 'string',
          specialization: [],
        },
      },
    },
    description: '200, returns profile data',
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
  async getCoachProfile(@Req() req: any) {
    const res = {
      status: 500,
      message: INTERNAL_SERVER_ERROR,
      data: {},
    };
    const row = await this.profileService.findUserByUserId(
      req.user.email,
      'coach',
    );
    if (row) {
      res.status = 200;
      res.data = row;
      res.message = DATA_FOUND;
    } else {
      res.status = 200;
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
        data: {
          title: 'string',
          experience: [],
          education: [],
          language: [],
          about: 'string',
          specialization: [],
        },
      },
    },
    description: '200, returns profile data',
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
  @Get('publicProfile/:user_id')
  async coachProfileFromUserSide(@Param('user_id') userId: string) {
    const res = {
      status: 200,
      message: DATA_NOT_FOUND,
      data: {},
    };
    const row = await this.profileService.findProfilePublicViewByUserId(userId);
    if (row) {
      res.data = row;
      res.message = DATA_FOUND;
    } else {
      res.status = 400;
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
          title: 'string',
          experience: [],
          education: [],
          language: [],
          about: 'string',
          specialization: [],
        },
      },
    },
    description: '200, returns profile data',
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
  @Get('user-profile/:user_id')
  async userProfileFromCoachSide(@Param('user_id') userId: string) {
    const res = {
      status: 200,
      message: DATA_NOT_FOUND,
      data: {},
    };
    const row = await this.profileService.findUserPublicProfileByUserId(userId);
    if (row.length > 0) {
      res.data = row[0];
      res.message = DATA_FOUND;
    } else {
      res.status = 400;
    }
    return res;
  }

  @ApiCreatedResponse({
    schema: {
      type: 'object',
      example: { status: 200, message: DATA_UPDATED },
    },
    description: '201, return ok response after update profile',
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
    description: '500: Internal Server Error',
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
  @ApiBody({ type: UpdateProfileDto })
  @Put('updateProfile/:user_id')
  async updateProfile(
    @Body() req: UpdateProfileDto,
    @Param('user_id') userId: string,
  ) {
    const res = {
      status: 500,
      message: INTERNAL_SERVER_ERROR,
    };
    const result = await this.profileService.updateProfile(
      userId,
      req,
      'coach',
    );
    if (result) {
      res.status = 200;
      res.message = DATA_UPDATED;
    }
    return res;
  }

  @ApiCreatedResponse({
    schema: {
      type: 'object',
      example: { status: 200, message: DATA_UPDATED },
    },
    description: '201, return ok response after update profile',
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
    description: '500: Internal Server Error',
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
  @ApiBody({ type: UploadCertificatesDto })
  @Put('upload-certificates/:user_id')
  async uploadCertificates(
    @Body() req: UploadCertificatesDto,
    @Param('user_id') userId: string,
  ) {
    const res = {
      status: 500,
      message: INTERNAL_SERVER_ERROR,
    };
    const result = await this.profileService.updateCoachCertificates(
      userId,
      req,
      'coach',
    );
    if (result) {
      res.status = 200;
      res.message = DATA_UPDATED;
    }
    return res;
  }

  @ApiCreatedResponse({
    schema: {
      type: 'object',
      example: { status: 200, message: DATA_UPDATED },
    },
    description: '201, return ok response after update profile',
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
    description: '500: Internal Server Error',
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
  @ApiBody({ type: UploadIntroVideoDto })
  @Put('upload-intro-video/:user_id')
  async uploadIntroVideo(
    @Body() req: UploadIntroVideoDto,
    @Param('user_id') userId: string,
  ) {
    const res = {
      status: 500,
      message: INTERNAL_SERVER_ERROR,
    };
    const result = await this.profileService.updateProfileIntroVideo(
      userId,
      req,
      'coach',
    );
    if (result) {
      res.status = 200;
      res.message = DATA_UPDATED;
    }
    return res;
  }

  //User's Profile Section
  @ApiCreatedResponse({
    schema: {
      type: 'object',
      example: { status: 201, message: SUCCESSFULLY_SAVED },
    },
    description: '201, return success message',
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
    description: '500: Internal Server Error',
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
  @Post('userProfile')
  createUserProfile(@Req() req: any, @Body() reqBody: CreateUserProfileDto) {
    return this.profileService.createUserProfile(reqBody, req.user.email);
  }

  @ApiOkResponse({
    schema: {
      type: 'object',
      example: {
        status: 200,
        message: 'message',
        data: {
          title: 'string',
          experience: 'string',
          education: 'string',
          language: [],
          about: 'string',
        },
      },
    },
    description: '200, returns profile data',
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
  @Get('userProfile')
  async getUserProfileUserSide(@Req() req: any) {
    const res = {
      status: 500,
      message: INTERNAL_SERVER_ERROR,
      data: {},
    };
    const row = await this.profileService.findUserByUserId(
      req.user.email,
      'user',
    );
    if (row) {
      res.status = 200;
      res.data = row;
      res.message = DATA_FOUND;
    } else {
      res.status = 200;
      res.message = DATA_NOT_FOUND;
    }
    return res;
  }

  @ApiCreatedResponse({
    schema: {
      type: 'object',
      example: { status: 200, message: DATA_UPDATED },
    },
    description: '201, return ok response after update profile',
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
    description: '500: Internal Server Error',
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
  @ApiBody({ type: UpdateUserProfileDto })
  @Put('updateUserProfile/:user_id')
  async updateUserProfile(
    @Body() req: UpdateUserProfileDto,
    @Param('user_id') userId: string,
  ) {
    const res = {
      status: 500,
      message: INTERNAL_SERVER_ERROR,
    };
    const result = await this.profileService.updateProfile(userId, req, 'user');
    if (result) {
      res.status = 200;
      res.message = DATA_UPDATED;
    }
    return res;
  }

  @ApiCreatedResponse({
    schema: {
      type: 'object',
      example: { status: 200, message: DATA_UPDATED },
    },
    description: '201, return ok response after update profile',
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
    description: '500: Internal Server Error',
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
  @ApiBody({ type: UpdateProfileUserSideDto })
  @Put('update-profile-user-side')
  async updateProfileUserSide(
    @Req() req: any,
    @Body() data: UpdateProfileUserSideDto,
  ) {
    const res = {
      status: 500,
      message: INTERNAL_SERVER_ERROR,
    };
    const result = await this.profileService.updateProfileUserSide(
      req.user.email,
      data,
      'user',
    );
    if (result) {
      res.status = 200;
      res.message = DATA_UPDATED;
    }
    return res;
  }
}
