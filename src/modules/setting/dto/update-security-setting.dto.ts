import { ApiProperty } from '@nestjs/swagger';
import {
  IsDefined, IsNotEmpty, IsObject, IsOptional, IsString,
  ValidateNested,
} from 'class-validator';
import {Type} from "class-transformer";
import {SecurityDto} from "@/modules/setting/dto/security.dto";

export class UpdateSecuritySettingDto {
  @ApiProperty({ type: SecurityDto})
  @ValidateNested({
    each: true,
  })
  @IsDefined()
  @IsObject()
  @IsNotEmpty()
  @Type(() => SecurityDto)
  security: SecurityDto

  @IsString()
  @IsOptional()
  type: string;


}
