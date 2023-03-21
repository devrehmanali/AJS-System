import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class AddressSettingDto {
  @IsString()
  @IsOptional()
  user_id?: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  country?: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  street_address?: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  city?: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  postal_code?: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  phone_number?: string;

}
