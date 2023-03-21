import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty, IsString, IsArray, ValidateNested, ArrayMinSize, ArrayMaxSize} from 'class-validator';

export class AnswersMetadataDto {
    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    type: string;

    @ApiProperty({ type: Array })
    @IsArray()
    @IsNotEmpty()
    answer: [];
}
