import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsNumber, IsObject,
  IsString,
} from 'class-validator';

export class CheckoutDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  price: number;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  customer_connect_account_id: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  duration: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  time: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  scope: string;

  @ApiProperty({ type: Object })
  @IsObject()
  @IsNotEmpty()
  options: object;
}
