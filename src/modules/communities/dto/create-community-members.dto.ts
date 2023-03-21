import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsArray } from 'class-validator';
export class CreateCommunityMembersDto {

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  community_id: string;

  @ApiProperty({ type: Array })
  @IsArray()
  @IsNotEmpty()
  user_id: [];

}
