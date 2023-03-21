import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  ValidateNested,
  IsDefined, IsOptional, IsObject, IsNotEmpty, IsString,
} from 'class-validator';
import {AddressSettingDto} from "@/modules/setting/dto/address-setting.dto";
import {ProfileDto} from "@/modules/profile/dto/profile.dto";

export class CreateProfileDto {
  @ApiProperty({ type: ProfileDto })
  @ValidateNested({
    each: true,
  })
  @IsDefined()
  @IsObject()
  @IsNotEmpty()
  @Type(() => ProfileDto)
  profile?: ProfileDto

  @ApiProperty({ type: AddressSettingDto })
  @ValidateNested({
    each: true,
  })
  @IsDefined()
  @IsObject()
  @IsNotEmpty()
  @Type(() => AddressSettingDto)
  settings?: AddressSettingDto

  @IsString()
  @IsOptional()
  type?: string;

}
