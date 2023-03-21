import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  IsDefined,
  IsOptional,
} from 'class-validator';
import { CreateExperienceDto } from './experience.dto';
import { CreateEducationDto } from './education.dto';

export class UpdateProfileDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: [CreateExperienceDto] })
  @ValidateNested({
    each: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  @Type(() => CreateExperienceDto)
  experience: CreateExperienceDto[];

  @ApiProperty({ type: [CreateEducationDto] })
  @ValidateNested({
    each: true,
  })
  @IsDefined()
  @IsNotEmpty()
  @IsArray()
  @Type(() => CreateEducationDto)
  education: CreateEducationDto[];

  @ApiProperty({ type: Array })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  language: Array<string>;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  about: string;

  @ApiProperty({ type: Array })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  specialization: Array<string>;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  video_link: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  intro_video: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  rate: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  time_duration: string;

  @ApiProperty({ type: Array })
  @IsArray()
  @IsOptional()
  certificates?: Array<string>;
}
