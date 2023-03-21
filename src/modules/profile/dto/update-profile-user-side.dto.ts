import { ApiProperty } from '@nestjs/swagger';
import {IsString, IsOptional, IsArray, IsNotEmpty} from 'class-validator';

export class UpdateProfileUserSideDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  position: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  company: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  education?: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  about: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  gender: string;

  @ApiProperty({ type: Array })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  language: Array<string>;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  country: string;

  type: string;
}
