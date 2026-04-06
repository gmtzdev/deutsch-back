import { ApiProperty } from '@nestjs/swagger';
import { CreateElementDto } from "../create-element.dto";

export class CreateTitleDto extends CreateElementDto {
    @ApiProperty({ example: 'h1' })
    baseStyle: string;
}