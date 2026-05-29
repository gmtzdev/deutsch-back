import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateElementDto } from '../create-element.dto';
import { CreateFillBlankTableRowDto } from './create-fill-blank-table-row.dto';

export class CreateFillBlankTableDto extends CreateElementDto {
    @ApiPropertyOptional({ example: 'bordered' })
    baseStyle?: string;

    @ApiProperty({ example: ['Satz', 'Respuesta'] })
    headers: string[];

    @ApiProperty({
        type: [CreateFillBlankTableRowDto],
        example: [
            { cells: ['Der Mann ___ nach Hause.', 'geht'] },
            { cells: ['Sie ___ Deutsch ___.', 'lernt,gern'] },
        ],
    })
    rows: CreateFillBlankTableRowDto[];
}
