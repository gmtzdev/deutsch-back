import { ApiProperty } from '@nestjs/swagger';
import { CreateElementDto } from "./create-element.dto";
import { CreateTitleDto } from './title/create-title.dto';
import { CreateSubtitleDto } from './subtitle/create-title.dto';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { LessonElementDto } from '../types/types';



export class CreateBodyLessonDto {
    @ApiProperty({
        type: [CreateElementDto],
        example: [
            { type: 'title', text: 'Lektion 1', style: 'normal', baseStyle: 'h1' },
            { type: 'subtitle', text: 'Einführung', style: 'normal', baseStyle: 'h2' },
            { type: 'element', text: 'Das ist ein Haus.', style: 'normal' },
        ],
    })
    elements: LessonElementDto[];


    @ApiProperty({ type: Lesson })
    lesson: Lesson;
}