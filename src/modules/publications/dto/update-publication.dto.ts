import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class UpdatePublicationDto {

    @ApiProperty({ type: String })
    @IsString()
    @IsOptional()
    title?: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsOptional()
    description?: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsOptional()
    post_image?: string;

    @ApiProperty({ type: Array })
    @IsArray()
    @IsOptional()
    dimensions?: [];

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    @IsOptional()
    is_published?: boolean;

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    @IsOptional()
    is_shared_wellavi?: boolean;

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    @IsOptional()
    is_shared_my_profile?: boolean;

    @ApiProperty({ type: Boolean })
    @IsBoolean()
    @IsOptional()
    is_shared_community?: boolean;

    @ApiProperty({ type: Array })
    @IsArray()
    @IsOptional()
    community_ids?: [];

}
