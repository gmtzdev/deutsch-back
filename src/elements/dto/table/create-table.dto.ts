import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateElementDto } from '../create-element.dto';
import { CreateTableRowDto } from './create-tablerow.dto';

export class CreateTableDto extends CreateElementDto {
    @ApiPropertyOptional({ example: 'bordered' })
    baseStyle?: string;

    @ApiProperty({ example: ['Pronomen', 'Verb', 'Objekt'] })
    headers: string[];

    @ApiProperty({
        type: [CreateTableRowDto],
        example: [
            { cells: ['Ich', 'lerne', 'Deutsch'] },
            { cells: ['Du', 'lernst', 'Deutsch'] },
            { cells: ['Er', 'lernt', 'Deutsch'] },
        ],
    })
    rows: CreateTableRowDto[];
}
