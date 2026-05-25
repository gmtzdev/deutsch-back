import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsOptional, IsString } from 'class-validator';

export class ChatMessageDto {
    @ApiProperty({ enum: ['user', 'assistant'], example: 'user' })
    role: 'user' | 'assistant';

    @ApiProperty({ example: 'Ahora agrega un quiz de práctica' })
    content: string;
}

export class GenerateLessonDto {
    @IsString()
    @ApiProperty({
        example: 'Crea una lección sobre los artículos definidos en alemán (der, die, das)',
        description: 'Instrucción para el AI sobre qué lección generar o cómo modificarla',
    })
    prompt: string;

    @IsArray()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Elementos actuales de la lección (para edición incremental)',
        example: [
            {
                type: 'title',
                order: 1,
                text: 'Die Artikel',
                baseStyle: 'h1',
            },
            {
                type: 'element',
                order: 2,
                text: 'Im Deutschen gibt es drei bestimmte Artikel: der, die und das.',
            },
            {
                type: 'table',
                order: 3,
                headers: ['Artikel', 'Genus', 'Beispiel'],
                rows: [
                    { cells: ['der', 'Maskulinum', 'der Mann'] },
                    { cells: ['die', 'Femininum', 'die Frau'] },
                    { cells: ['das', 'Neutrum', 'das Kind'] },
                ],
            },
        ],
    })
    currentElements?: any[];

    @IsArray()
    @IsOptional()
    @ApiPropertyOptional({
        description: 'Historial de mensajes para mantener el contexto de la conversación',
        type: [ChatMessageDto],
        example: [
            { role: 'user', content: 'Crea una lección sobre los artículos definidos' },
            { role: 'assistant', content: 'He creado una lección con título, explicación y tabla de artículos.' },
        ],
    })
    chatHistory?: ChatMessageDto[];
}
