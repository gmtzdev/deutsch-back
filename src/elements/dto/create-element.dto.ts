import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { ElementType } from '../types/types';

export class CreateElementDto {
    @ApiPropertyOptional({ example: 'Das ist ein Haus.' })
    text?: string;

    @ApiPropertyOptional({ example: 'normal' })
    style?: string;

    @ApiProperty({ enum: ['element', 'title', 'subtitle'], example: 'element' })
    type: ElementType;

    @ApiProperty({
        type: Lesson,
        example: {
            id: 2,
        }
    })
    lesson: Lesson;
}
