import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty, IsOptional,
  IsString,
} from 'class-validator';

export class UpdateCoachStatusDto {
  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  coach_status: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsNotEmpty()
  user_id: string;

  @ApiProperty({ type: String })
  @IsString()
  @IsOptional()
  reason_id: string;
}
