import { ApiProperty } from '@nestjs/swagger';
import { CreateElementDto } from "../create-element.dto";

export class CreateListItemDto extends CreateElementDto {
    @ApiProperty({ example: 'li' })
    baseStyle: string;
}