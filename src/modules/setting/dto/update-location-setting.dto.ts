import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray, IsDefined, IsNotEmpty, IsObject,
  IsOptional,
  IsString, ValidateNested,
} from 'class-validator';
import {Type} from "class-transformer";
import {CreatePaymentMethodDto} from "@/modules/setting/dto/create-payment-method.dto";

export class UpdateLocationSettingDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  timezone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  country: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  street_address: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  city: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  state: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  postal_code: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  phone_number: string;

  @IsString()
  @IsOptional()
  type: string;

}
