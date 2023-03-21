import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray, IsNotEmpty,
} from 'class-validator';

export class UpdateNotificationsUnseenStatusDto {
    @ApiProperty({ type: Array })
    @IsArray()
    @IsNotEmpty()
    id?: [];
}
