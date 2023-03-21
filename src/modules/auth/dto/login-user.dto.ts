import { ApiProperty } from '@nestjs/swagger';
import {IsOptional} from 'class-validator';
export default class LoginUserDto {
  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly password: string;

  @ApiProperty()
  @IsOptional()
  readonly device_id: string;
}
