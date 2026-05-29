import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateDragDropRowDto {
    @ApiPropertyOptional({ example: 12 })
    id?: number;

    @ApiPropertyOptional({ example: 'Ich' })
    before?: string;

    @ApiPropertyOptional({ example: 'Deutsch.' })
    after?: string;

    @ApiProperty({ example: 'lerne' })
    answer: string;
}
