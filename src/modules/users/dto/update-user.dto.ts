import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  first_name: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  last_name: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  age: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  gender: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  cover_image: string;

  @ApiProperty({ type: Array })
  @IsArray()
  @IsOptional()
  role: [];

}
