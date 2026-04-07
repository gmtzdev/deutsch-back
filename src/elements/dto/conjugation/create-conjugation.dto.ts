import { ApiProperty } from '@nestjs/swagger';
import { CreateElementDto } from '../create-element.dto';
import { CreateVerbDataDto } from './create-verb-data.dto';

export class CreateConjugationDto extends CreateElementDto {
    @ApiProperty({
        type: [CreateVerbDataDto],
        example: [
            {
                name: 'lernen',
                rows: [
                    { pronoun: 'ich', verb: 'lern', ending: 'e' },
                    { pronoun: 'du', verb: 'lern', ending: 'st' },
                    { pronoun: 'er', verb: 'lern', ending: 't' },
                    { pronoun: 'wir', verb: 'lern', ending: 'en' },
                    { pronoun: 'ihr', verb: 'lern', ending: 't' },
                    { pronoun: 'sie', verb: 'lern', ending: 'en' },
                ],
            },
        ],
    })
    verbs: CreateVerbDataDto[];
}
