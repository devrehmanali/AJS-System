import { ApiProperty } from '@nestjs/swagger';
import {
    IsArray,
    IsBoolean,
    IsNotEmpty,
    IsOptional,
    IsString,
} from 'class-validator';

export class publicationPostDto {

    @IsString()
    @IsOptional()
    user_id?: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsNotEmpty()
    description: string;

    @ApiProperty({ type: String })
    @IsString()
    @IsOptional()
    post_image: string;

    @ApiProperty({ type: Array })
    @IsArray()
    @IsOptional()
    dimensions?: [];

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
