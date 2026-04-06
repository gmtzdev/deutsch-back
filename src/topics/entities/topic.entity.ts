import { Level } from "../../levels/entities/level.entity";
import { Subtopic } from "../../subtopics/entities/subtopic.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Topic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    subtitle: string;

    @ManyToOne(() => Level, (level) => level.topics, { nullable: true, onDelete: 'CASCADE' })
    level: Level;

    @OneToMany(() => Subtopic, (subtopic) => subtopic.topic)
    subtopics: Subtopic[];
}
