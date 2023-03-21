import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePaymentMethodDto {
  @ApiProperty({ type: String })
  @IsString()
  payment_method_id: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  expiry_month: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  expiry_year: string;
}
