import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty, IsNumber, IsString,
} from 'class-validator';

export class OpenHoursAvailabilitiesDto {
  @ApiProperty({ type: Array })
  @IsArray()
  @IsNotEmpty()
  days: number[];

  @ApiProperty({ type: Array })
  @IsArray()
  @IsNotEmpty()
  emails: [];

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  end: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  object_type: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  start: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  timezone: string;

}
