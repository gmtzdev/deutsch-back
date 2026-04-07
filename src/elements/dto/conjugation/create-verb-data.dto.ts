import { ApiProperty } from '@nestjs/swagger';
import { CreateConjugationRowDto } from './create-conjugation-row.dto';

export class CreateVerbDataDto {
    @ApiProperty({ example: 'lernen' })
    name: string;

    @ApiProperty({
        type: [CreateConjugationRowDto],
        example: [
            { pronoun: 'ich', verb: 'lern', ending: 'e' },
            { pronoun: 'du', verb: 'lern', ending: 'st' },
            { pronoun: 'er', verb: 'lern', ending: 't' },
            { pronoun: 'wir', verb: 'lern', ending: 'en' },
            { pronoun: 'ihr', verb: 'lern', ending: 't' },
            { pronoun: 'sie', verb: 'lern', ending: 'en' },
        ],
    })
    rows: CreateConjugationRowDto[];
}
