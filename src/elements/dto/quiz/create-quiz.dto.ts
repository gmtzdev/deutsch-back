import { ApiProperty } from '@nestjs/swagger';
import { CreateElementDto } from '../create-element.dto';
import { CreateQuizQuestionDto } from './create-quiz-question.dto';

export class CreateQuizDto extends CreateElementDto {
    @ApiProperty({
        type: [CreateQuizQuestionDto],
        example: [
            { question: 'Wie sagt man "Haus" auf Englisch?', answer: 'house', hint: 'Ein Substantiv' },
            { question: 'Wie sagt man "lernen" auf Englisch?', answer: 'to learn' },
        ],
    })
    questions: CreateQuizQuestionDto[];
}
