import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdatePaymentMethodDefaultDto {
  @ApiProperty({ type: String })
  @IsString()
  customer_id: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  payment_id: string;
}
