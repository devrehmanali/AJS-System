import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsNumber, IsObject,
  IsString,
} from 'class-validator';

export class FeedbackDto {

  @ApiProperty({ type: String })
  @IsString()
  feedback: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  type: string;

  // @ApiProperty({ type: String })
  // @IsString()
  // user_id: string;

}
