import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class DeleteCardDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  payment_id: string;

}
