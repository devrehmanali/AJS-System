import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString, IsBoolean, IsOptional} from 'class-validator';

export class CreateExperienceDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  title!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  employment_type!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  company_name!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  start_month!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  start_year!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  end_month: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  end_year: string;

  @ApiProperty({ type: Boolean })
  @IsBoolean()
  @IsOptional()
  is_currently_working: boolean;
}
