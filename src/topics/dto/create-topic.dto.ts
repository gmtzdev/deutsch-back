import { ApiProperty } from "@nestjs/swagger";
import { Level } from "../../levels/entities/level.entity";

export class CreateTopicDto {
    @ApiProperty({ example: 'Thema 1' })
    title: string;

    @ApiProperty({ example: 'Hallo ich heiße…' })
    subtitle: string;

    @ApiProperty({
        type: Level,
        example: {
            id: 1,
        }
    })
    level: Level;
}
