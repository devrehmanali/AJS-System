import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsNumber,
} from 'class-validator';

export class NestedObjectDto {
  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  start_time: number;

  @ApiProperty({ type: Number })
  @IsNumber()
  @IsNotEmpty()
  end_time: number;

}
