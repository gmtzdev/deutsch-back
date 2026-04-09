import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDragDropRowDto {
    @ApiPropertyOptional({ example: 'Ich' })
    before?: string;

    @ApiPropertyOptional({ example: 'Deutsch.' })
    after?: string;

    @ApiProperty({ example: 'lerne' })
    answer: string;
}
