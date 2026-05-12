import { ApiProperty } from "@nestjs/swagger";
import { Level } from "../../levels/entities/level.entity";
import { IsNotEmpty, IsObject, IsString } from "class-validator";

export class CreateTopicDto {
    @ApiProperty({ example: 'Thema 1' })
    @IsString({ message: 'Der Titel muss ein String sein' })
    @IsNotEmpty({ message: 'Der Titel darf nicht leer sein' })
    title: string;

    @ApiProperty({ example: 'Hallo ich heiße…' })
    @IsString({ message: 'Der Untertitel muss ein String sein' })
    @IsNotEmpty({ message: 'Der Untertitel darf nicht leer sein' })
    subtitle: string;

    @IsObject({ message: 'Das Level muss ein Objekt sein' })
    @IsNotEmpty({ message: 'Die Level ID darf nicht leer sein' })
    @ApiProperty({
        type: Level,
        example: {
            id: 1,
        }
    })
    level: Level;
}
