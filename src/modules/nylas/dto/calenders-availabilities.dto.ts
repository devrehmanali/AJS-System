import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty, IsNumber, IsString,
} from 'class-validator';

export class CalendersAvailabilitiesDto {
  @ApiProperty({ type: Array })
  @IsArray()
  @IsNotEmpty()
  calendar_ids: [];

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  account_id: string;

}
