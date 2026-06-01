import { ApiProperty } from '@nestjs/swagger';
import { CreateElementDto } from '../create-element.dto';
import { CreateMultipleChoiceQuestionDto } from './create-multiple-choice-question.dto';

export class CreateMultipleChoiceDto extends CreateElementDto {
    @ApiProperty({
        type: [CreateMultipleChoiceQuestionDto],
        example: [
            {
                question: 'Wie dice "house" en alemán?',
                options: ['Haus', 'Auto', 'Buch'],
                correctOption: 0,
            },
            {
                question: 'Selecciona la traducción de "book"',
                options: ['Baum', 'Buch', 'Stuhl'],
                correctOption: 1,
            },
        ],
    })
    questions: CreateMultipleChoiceQuestionDto[];
}
