import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdateUserProfileDto {
  @IsString()
  @IsOptional()
  user_id?: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  title?: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  experience?: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  education?: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  about?: string;

  @ApiProperty({ type: Array })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  language?: Array<string>;

  type: string;
}
