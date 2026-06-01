import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateTextQuestionItemDto {
    @ApiPropertyOptional({ example: 34 })
    id?: number;

    @ApiProperty({ example: 'Wie sagt man "house" auf Deutsch?' })
    question: string;

    @ApiProperty({ example: 'Haus' })
    answer: string;
}
