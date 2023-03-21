import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreateSessionMetadataDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  eventType: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  status: string;
}
