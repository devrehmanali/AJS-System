import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  IsDefined,
  IsOptional,
  IsObject,
} from 'class-validator';
import { CreateExperienceDto } from './experience.dto';
import { CreateEducationDto } from './education.dto';
import { AddressSettingDto } from '@/modules/setting/dto/address-setting.dto';

export class ProfileDto {
  @IsString()
  @IsOptional()
  user_id?: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  title?: string;

  @ApiProperty({ type: [CreateExperienceDto] })
  @ValidateNested({
    each: true,
  })
  @IsDefined()
  @IsArray()
  @IsNotEmpty()
  @Type(() => CreateExperienceDto)
  experience?: CreateExperienceDto[];

  @ApiProperty({ type: [CreateEducationDto] })
  @ValidateNested({
    each: true,
  })
  @IsDefined()
  @IsArray()
  @IsNotEmpty()
  @Type(() => CreateEducationDto)
  education?: CreateEducationDto[];

  @ApiProperty({ type: Array })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  language?: Array<string>;

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
  @IsNotEmpty()
  about?: string;

  @ApiProperty({ type: Array })
  @IsArray()
  @IsString({ each: true })
  @IsNotEmpty()
  specialization?: Array<string>;
}
