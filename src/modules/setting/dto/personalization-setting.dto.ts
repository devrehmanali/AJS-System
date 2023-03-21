import { IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class personalizationSettingDto
 {
    @ApiProperty()
    @IsBoolean()
    is_age_hidden: boolean;
    
    @ApiProperty()
    @IsBoolean()
    is_gender_hidden: boolean;

    @ApiProperty()
    @IsBoolean()
    is_country_hidden: boolean;
}
