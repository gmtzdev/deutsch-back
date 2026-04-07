import { ApiProperty } from '@nestjs/swagger';

export class CreateTableRowDto {
    @ApiProperty({ example: ['Ich', 'lerne', 'Deutsch'] })
    cells: string[];
}
