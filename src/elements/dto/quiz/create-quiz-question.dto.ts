import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateQuizQuestionDto {
    @ApiProperty({ example: 'Wie sagt man "Haus" auf Englisch?' })
    question: string;

    @ApiProperty({ example: 'house' })
    answer: string;

    @ApiPropertyOptional({ example: 'Ein Substantiv' })
    hint?: string;
}
