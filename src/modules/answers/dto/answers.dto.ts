import { ApiProperty } from '@nestjs/swagger';
import {ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmpty, IsOptional, IsString, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';
import {AnswersMetadataDto} from '@/modules/answers/dto/answers-metadata.dto';

export class AnswersDto {
  // @ApiProperty({ type: [AnswersMetadataDto] })
  // @IsArray()
  // @ValidateNested({
  //   each: true,
  // })
  // @IsNotEmpty()
  // @Type(() => AnswersMetadataDto)
  // // @ArrayMinSize(7)
  // // @ArrayMaxSize(7)
  // request?: AnswersMetadataDto[];

  @ApiProperty()
  @IsString()
  @IsOptional()
  questionId: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  role: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  type: string;

  @ApiProperty({ type: Array })
  @IsArray()
  @IsNotEmpty()
  answer: [];
}
