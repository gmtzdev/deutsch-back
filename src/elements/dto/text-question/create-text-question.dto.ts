import { ApiProperty } from '@nestjs/swagger';
import { CreateElementDto } from '../create-element.dto';
import { CreateTextQuestionItemDto } from './create-text-question-item.dto';

export class CreateTextQuestionDto extends CreateElementDto {
    @ApiProperty({
        type: [CreateTextQuestionItemDto],
        example: [
            { question: 'Wie sagt man "house" auf Deutsch?', answer: 'Haus' },
            { question: 'Wie dice "book" en alemán?', answer: 'Buch' },
        ],
    })
    questions: CreateTextQuestionItemDto[];
}
