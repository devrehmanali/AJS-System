import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined, IsNotEmpty, IsObject, IsOptional,
  IsString, ValidateNested,
} from 'class-validator';
import {Type} from "class-transformer";
import {CreatePaymentMethodDto} from "@/modules/setting/dto/create-payment-method.dto";

export class UpdateSubscriptionSettingDto {
  @ApiProperty({ type: CreatePaymentMethodDto})
  @ValidateNested({
    each: true,
  })
  @IsDefined()
  @IsObject()
  @IsNotEmpty()
  @Type(() => CreatePaymentMethodDto)
  payment_method: CreatePaymentMethodDto

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  subscription: string;

  @IsString()
  @IsOptional()
  type: string;


}
