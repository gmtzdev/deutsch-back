import { ApiProperty } from '@nestjs/swagger';
import { CreateElementDto } from "./create-element.dto";
import { CreateTitleDto } from './title/create-title.dto';
import { CreateSubtitleDto } from './subtitle/create-title.dto';
import { Lesson } from 'src/lessons/entities/lesson.entity';
import { LessonElementDto } from '../types/types';
import { ArrayMaxSize, ArrayMinSize, IsArray, IsNotEmptyObject, IsObject, ValidateNested } from 'class-validator';



export class CreateBodyLessonDto {
    @ApiProperty({
        type: [CreateElementDto],
        example: [
            { type: 'title', text: 'Lektion 1', style: 'normal', baseStyle: 'h1' },
            { type: 'subtitle', text: 'Einführung', style: 'normal', baseStyle: 'h2' },
            { type: 'element', text: 'Das ist ein Haus.', style: 'normal' },
        ],
    })
    @IsArray({ message: 'Los elementos deben ser un array' })
    @ArrayMinSize(1, { message: 'Debe contener al menos un elemento' })
    elements: LessonElementDto[];


    @ApiProperty({ type: Lesson })
    @IsObject({ message: 'La lección debe ser un objeto' })
    @IsNotEmptyObject({ nullable: false }, { message: 'La lección no puede estar vacía' })
    lesson: Lesson;
}