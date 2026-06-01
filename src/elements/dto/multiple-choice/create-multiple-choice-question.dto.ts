import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateMultipleChoiceQuestionDto {
    @ApiPropertyOptional({ example: 45 })
    id?: number;

    @ApiProperty({ example: 'Wie dice "house" en alemán?' })
    question: string;

    @ApiProperty({ example: ['Haus', 'Auto', 'Buch'] })
    options: string;

    @ApiProperty({ example: 0 })
    correctOption: number;
}
