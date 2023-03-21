import { ApiProperty } from '@nestjs/swagger';
import {
  IsArray, IsDefined, IsObject,
  IsOptional,
  IsString, ValidateNested,
} from 'class-validator';
import {Type} from "class-transformer";
import {CreatePaymentMethodDto} from "@/modules/setting/dto/create-payment-method.dto";

export class GeneralSettingDto {
  @ApiProperty()
  @IsString()
  @IsOptional()
  email: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  timezone: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  old_password?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  password?: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  subscription?: string;

  @ApiProperty({ type: [CreatePaymentMethodDto] })
  @ValidateNested({
    each: true,
  })
  @IsDefined()
  @IsArray()
  @IsOptional()
  @Type(() => CreatePaymentMethodDto)
  payment_method?: CreatePaymentMethodDto[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  calender?: string;

  @ApiProperty()
  @IsObject()
  @IsOptional()
  notification_setting?: {};

}
