import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class CreatePaymentMethodDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  card_number: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  expiration?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  cvc?: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  country?: string;

}
