import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateEducationDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  school!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  degree!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  field_of_study!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  start_month!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  start_year!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  end_month!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  end_year!: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  grade!: string;
}
