import { ApiProperty } from "@nestjs/swagger";
import { Topic } from "src/topics/entities/topic.entity";


export class UpdateSubtopicDto {
    @ApiProperty({ example: 'Lernziel' })
    title: string;

    @ApiProperty({ example: 'book' })
    icon?: string;

    @ApiProperty({ example: '/' })
    path?: string;

    @ApiProperty({
        type: Topic,
        example: {
            id: 1,
        }
    })
    topic: Topic;
}
