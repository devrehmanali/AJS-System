import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsString,
  IsArray,
  ValidateNested,
  IsDefined, IsOptional,
} from 'class-validator';
import { CreateExperienceDto } from './experience.dto';
import { CreateEducationDto } from './education.dto';

export class UploadCertificatesDto {
  @ApiProperty({ type: Array })
  @IsArray()
  @IsNotEmpty()
  certificates?: Array<string>;
}
