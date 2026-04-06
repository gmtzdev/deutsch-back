import { ApiProperty } from "@nestjs/swagger";

export class CreateLevelDto {
    @ApiProperty({ example: 'Principiante absoluto' })
    title: string;

    @ApiProperty({ example: 'Primeras palabras y saludos. Objetos cotidianos y frases básicas.' })
    description: string;

    @ApiProperty({ example: 'https://example.com/icon.png' })
    icon: string;

    @ApiProperty({ example: 'A1.1' })
    tag: string;

    @ApiProperty({ example: 10 })
    lessonNumber: number;
}
