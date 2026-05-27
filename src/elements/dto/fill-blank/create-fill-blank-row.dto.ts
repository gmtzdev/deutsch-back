import { ApiProperty } from '@nestjs/swagger';

export class CreateFillBlankRowDto {
    @ApiProperty({ example: 'Der Mann ___ nach Hause ___.' })
    sentence: string;

    @ApiProperty({ example: ['geht', 'gegangen'] })
    answers: string[];
}
