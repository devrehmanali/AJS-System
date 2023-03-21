import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsNumber, IsObject,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateSessionDto {

  @IsString()
  @IsOptional()
  customer_connect_account_id: string;

  @ApiProperty({ type: Number })
  @IsNumber()
  price: number;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({ type: String })
  @IsNumber()
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

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  type: string;

  @ApiProperty({ type: Object })
  @IsObject()
  @IsNotEmpty()
  options: object;
}
