import { ApiProperty } from '@nestjs/swagger';
import { CreateElementDto } from '../create-element.dto';
import { CreateDragDropRowDto } from './create-drag-drop-row.dto';

export class CreateDragDropDto extends CreateElementDto {
    @ApiProperty({ example: ['lerne', 'lernt', 'lernst'] })
    words: string[];

    @ApiProperty({
        type: [CreateDragDropRowDto],
        example: [
            { before: 'Ich', after: 'Deutsch.', answer: 'lerne' },
            { before: 'Du', after: 'Deutsch.', answer: 'lernst' },
        ],
    })
    rows: CreateDragDropRowDto[];
}
