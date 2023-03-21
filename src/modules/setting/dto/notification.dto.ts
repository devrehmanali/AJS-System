import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsString,
} from 'class-validator';

export class NotificationDto {
  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  product_news: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  content_recommendation: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  wellavi_digest: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  coach_updated: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  community_updated: boolean;

  @ApiProperty()
  @IsBoolean()
  @IsNotEmpty()
  comments: boolean;

  // @ApiProperty()
  // @IsBoolean()
  // everything: boolean;
  //
  // @ApiProperty()
  // @IsBoolean()
  // same_as_email: boolean;
  //
  // @ApiProperty()
  // @IsBoolean()
  // no_push_notification: boolean;



}
