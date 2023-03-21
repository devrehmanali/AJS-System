import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UploadIntroVideoDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  intro_video?: string;
}
