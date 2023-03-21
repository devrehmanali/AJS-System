import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsNotEmpty, IsString, IsArray } from 'class-validator';

export class DeleteFollowersDto {
  @ApiProperty({ type: Array })
  @IsArray()
  @IsOptional()
  user_id: [];

}
