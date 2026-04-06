import { ApiProperty } from "@nestjs/swagger";
import { Subtopic } from "../../subtopics/entities/subtopic.entity";

export class CreateLessonDto {
    @ApiProperty({ example: 'Lektion 1' })
    type: string;

    @ApiProperty({
        type: Subtopic,
        example: {
            id: 1,
        }
    })
    subtopic: Subtopic;
}
