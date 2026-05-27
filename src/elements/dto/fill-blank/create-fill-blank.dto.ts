import { ApiProperty } from '@nestjs/swagger';
import { CreateElementDto } from '../create-element.dto';
import { CreateFillBlankRowDto } from './create-fill-blank-row.dto';

export class CreateFillBlankDto extends CreateElementDto {
    @ApiProperty({
        type: [CreateFillBlankRowDto],
        example: [
            { sentence: 'Der Mann ___ nach Hause.', answers: ['geht'] },
            { sentence: 'Sie ___ Deutsch ___.', answers: ['lernt', 'gern'] },
        ],
    })
    rows: CreateFillBlankRowDto[];
}
