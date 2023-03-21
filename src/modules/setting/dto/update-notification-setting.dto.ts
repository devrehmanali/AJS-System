import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined, IsNotEmpty, IsObject, IsOptional, IsString,
  ValidateNested,
} from 'class-validator';
import {Type} from "class-transformer";
import {CreatePaymentMethodDto} from "@/modules/setting/dto/create-payment-method.dto";
import {NotificationDto} from "@/modules/setting/dto/notification.dto";
import {object} from "joi";

export class UpdateNotificationSettingDto {
  @ApiProperty({ type: NotificationDto})
  @ValidateNested({
    each: true,
  })
  @IsDefined()
  @IsObject()
  @IsNotEmpty()
  @Type(() => NotificationDto)
  notification_setting: NotificationDto

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  push_notification: string

  @IsString()
  @IsOptional()
  type: string;

}
