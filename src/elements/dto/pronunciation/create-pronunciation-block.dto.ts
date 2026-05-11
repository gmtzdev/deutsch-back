import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsArray, ValidateNested } from 'class-validator';
import { CreateElementDto } from '../create-element.dto';
import { CreatePronunciationItemDto } from './create-pronunciation-item.dto';

export class CreatePronunciationBlockDto extends CreateElementDto {
    @ApiProperty({
        type: [CreatePronunciationItemDto],
        example: [
            { text: 'Guten Morgen', label: 'Begrüßung' },
            { text: 'Auf Wiedersehen' },
        ],
    })
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => CreatePronunciationItemDto)
    items: CreatePronunciationItemDto[];
}
