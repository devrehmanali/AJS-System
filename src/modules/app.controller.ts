import { Controller, Get, Param, Req, UseGuards, } from '@nestjs/common';
import {
  ApiBadRequestResponse, ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiTags,
  ApiUnauthorizedResponse
} from '@nestjs/swagger';
import { BAD_REQUEST, DATA_FOUND, DATA_NOT_FOUND, INTERNAL_SERVER_ERROR } from '@/constants/constants';
import { JwtAuthGuard } from '@auth/guards/jwt-auth.guard';
import { CountryData, languagesData } from '@helpers/general.helper';

@ApiTags('Dashboard')
@Controller('dashboard')
export class AppController {

  constructor() { }


}