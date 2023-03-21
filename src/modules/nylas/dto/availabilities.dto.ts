import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsObject,
  ValidateNested,
  IsDefined,
  IsNumber, IsArray
} from 'class-validator';
import {Type} from 'class-transformer';
import {OpenHoursAvailabilitiesDto} from '@/modules/nylas/dto/open-hours-availabilities.dto';
import {CalendersAvailabilitiesDto} from '@/modules/nylas/dto/calenders-availabilities.dto';

export class AvailabilitiesDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  duration_minutes: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  end_time: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  interval_minutes: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  start_time: number;

  @ApiProperty({ type: [OpenHoursAvailabilitiesDto] })
  @ValidateNested({
    each: true,
  })
  @IsDefined()
  @IsArray()
  @IsNotEmpty()
  @Type(() => OpenHoursAvailabilitiesDto)
  open_hours: OpenHoursAvailabilitiesDto[]

  @ApiProperty({ type: [CalendersAvailabilitiesDto] })
  @ValidateNested({
    each: true,
  })
  @IsDefined()
  @IsArray()
  @IsNotEmpty()
  @Type(() => CalendersAvailabilitiesDto)
  calendars: CalendersAvailabilitiesDto[]

}
