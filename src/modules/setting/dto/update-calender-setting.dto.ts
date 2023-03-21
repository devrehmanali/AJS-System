import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsOptional,
  IsString,
} from 'class-validator';

export class UpdateCalenderSettingDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  calender: string;

  @IsString()
  @IsOptional()
  type: string;

}
