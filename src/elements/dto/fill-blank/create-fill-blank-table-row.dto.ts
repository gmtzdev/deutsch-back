import { ApiProperty } from '@nestjs/swagger';

export class CreateFillBlankTableRowDto {
    @ApiProperty({ example: ['Der Mann ___ nach Hause.', 'geht'] })
    cells: string[];
}
