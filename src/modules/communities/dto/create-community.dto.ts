import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateCommunityDto {
  @IsString()
  @IsOptional()
  user_id?: string;


  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  image: string;

  @ApiProperty({ type: Array })
  @IsArray()
  @IsOptional()
  dimensions: [];

}
