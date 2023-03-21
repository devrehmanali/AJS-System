import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class SecurityDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  mobile_app_prompt: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  text_message: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  security_question: boolean;
}
