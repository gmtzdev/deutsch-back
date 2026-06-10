import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsObject, IsString } from "class-validator";
import { Topic } from "src/topics/entities/topic.entity";


export class UpdateSubtopicDto {
    @ApiProperty({ example: 'Lernziel' })
    @IsString()
    @IsNotEmpty()
    title: string;

    @ApiProperty({ example: 'book' })
    @IsString()
    icon?: string;

    @ApiProperty({ example: '/' })
    @IsString()
    path?: string;

    @ApiProperty({ example: true })
    @IsNotEmpty({ message: 'Die Sichtbarkeit darf nicht leer sein' })
    visible?: boolean;

    @ApiProperty({
        type: Topic,
        example: {
            id: 1,
        }
    })
    @IsObject({ message: 'Das Topic muss ein Objekt sein' })
    @IsNotEmpty({ message: 'Die Topic ID darf nicht leer sein' })
    topic: Topic;
}
