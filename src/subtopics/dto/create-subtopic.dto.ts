import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsObject, ValidateNested } from "class-validator";
import { Type } from "class-transformer";
import { Topic } from "../../topics/entities/topic.entity";

class TopicIdDto {
    @IsNotEmpty({ message: 'El id del topic no puede estar vacío' })
    id: number;
}

export class CreateSubtopicDto {

    @ApiProperty({ example: 'Lernziel' })
    @IsString({ message: 'El título debe ser un texto' })
    @IsNotEmpty({ message: 'El título no puede estar vacío' })
    title: string;

    @ApiProperty({ example: 'book' })
    // @IsString({ message: 'El icono debe ser un texto' })
    // @IsNotEmpty({ message: 'El icono no puede estar vacío' })
    icon: string;

    @ApiProperty({ example: '/' })
    // @IsString({ message: 'El path debe ser un texto' })
    // @IsNotEmpty({ message: 'El path no puede estar vacío' })
    path: string;

    @ApiProperty({
        type: Topic,
        example: {
            id: 1,
        }
    })
    @IsObject({ message: 'El topic debe ser un objeto' })
    @ValidateNested({ message: 'El topic no es válido' })
    @Type(() => TopicIdDto)
    topic: Topic;
}
