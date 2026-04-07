import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateConjugationRowDto {
    @ApiProperty({ example: 'ich' })
    pronoun: string;

    @ApiProperty({ example: 'lern' })
    verb: string;

    @ApiPropertyOptional({ example: 'e' })
    ending?: string;
}
