import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreatePronunciationItemDto {
    id?: number;

    @ApiProperty({ example: 'Guten Morgen' })
    @IsString()
    @IsNotEmpty()
    text: string;

    @ApiProperty({ example: 'Begrüßung', required: false })
    @IsString()
    @IsOptional()
    label?: string;
}
