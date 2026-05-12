import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { ElementType } from '../types/types';

export class CreateElementDto {
    id?: number;

    @ApiPropertyOptional({ example: 'Das ist ein Haus.' })
    text?: string;

    @ApiPropertyOptional({ example: 'normal' })
    style?: string;

    @ApiProperty({ enum: ['element', 'title', 'subtitle'], example: 'element' })
    type: ElementType;

    @ApiProperty({ example: 1 })
    order: number;

    @ApiProperty({
        type: Lesson,
        example: {
            id: 2,
        }
    })
    lesson: Lesson;

    @ApiProperty({ example: false })
    delete: boolean;

    @ApiPropertyOptional({ example: 'grid_1715000000000' })
    gridId?: string | null;

    @ApiPropertyOptional({ example: 1 })
    gridCols?: number;
}
