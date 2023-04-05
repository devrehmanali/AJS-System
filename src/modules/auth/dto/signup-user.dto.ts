import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty, IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class SignUpUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  user_id: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(64)
  password: string;

}
