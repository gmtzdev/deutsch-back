import { ApiProperty } from '@nestjs/swagger';
import { CreateElementDto } from "../create-element.dto";

export class CreateSubtitleDto extends CreateElementDto {
    @ApiProperty({ example: 'h2' })
    baseStyle: string;
}