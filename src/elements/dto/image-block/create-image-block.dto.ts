import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { CreateElementDto } from '../create-element.dto';

export class CreateImageBlockDto extends CreateElementDto {
    /**
     * Filename returned by POST /api/elements/upload-image
     * Stored in the inherited `text` field.
     */
    @ApiProperty({ example: '1712345678-photo.jpg', description: 'Filename returned by the upload endpoint' })
    text: string;

    @ApiPropertyOptional({ example: 'Ein Haus in Deutschland', description: 'Alt text / caption' })
    style?: string;
}
