import { ApiProperty } from '@nestjs/swagger';
import {IsOptional, IsNotEmpty, IsString, IsArray, IsObject, ValidateNested, IsDefined} from 'class-validator';
import {Type} from 'class-transformer';
import {NestedObjectDto} from '@/modules/nylas/dto/nested-object.dto';
import {CreateSessionMetadataDto} from '@/modules/nylas/dto/create-session-metadata.dto';

export class CreateNylasSessionDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  created_by: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  price: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  coach_id: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  session_type: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  title: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  duration: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  time: string;

  @ApiProperty({ type: NestedObjectDto })
  @ValidateNested({
    each: true,
  })
  @IsDefined()
  @IsObject()
  @IsNotEmpty()
  @Type(() => NestedObjectDto)
  when: NestedObjectDto

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  location: string;

  @ApiProperty({ type: Array })
  @IsArray()
  @IsNotEmpty()
  participants: [];

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty({ type: CreateSessionMetadataDto })
  @ValidateNested({
    each: true,
  })
  @IsDefined()
  @IsObject()
  @IsNotEmpty()
  @Type(() => CreateSessionMetadataDto)
  metadata: CreateSessionMetadataDto

  @IsString()
  @IsOptional()
  calendar_id: string;
}
