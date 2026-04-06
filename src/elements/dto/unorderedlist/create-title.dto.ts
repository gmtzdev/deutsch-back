import { ApiProperty } from '@nestjs/swagger';
import { CreateElementDto } from "../create-element.dto";
import { CreateListItemDto } from '../listitem/create-title.dto';
import { ListItem } from 'src/elements/entities/listitem.entity';

export class CreateUnorderedListDto extends CreateElementDto {
    @ApiProperty({ example: 'ul' })
    baseStyle: string;

    @ApiProperty({
        type: () => [CreateListItemDto],
        example: [{ baseStyle: 'li', content: 'List item 1' }, { baseStyle: 'li', content: 'List item 2' }]
    })
    list: ListItem[];
}