import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddCardDto {
  @ApiProperty({ type: String })
  @IsString()
  card_number: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  cvc: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  expiry_month: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  expiry_year: string;
}
