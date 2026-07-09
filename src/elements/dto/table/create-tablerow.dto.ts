import { ApiProperty } from '@nestjs/swagger';

export class CreateTableRowDto {
    id: number;
    @ApiProperty({ example: ['Ich', 'lerne', 'Deutsch'] })
    cells: string[];
}
