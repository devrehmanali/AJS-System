import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSubscriptionDto {
  @ApiProperty({ type: String })
  @IsString()
  customer_id: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  item_price: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  type: string;
}
