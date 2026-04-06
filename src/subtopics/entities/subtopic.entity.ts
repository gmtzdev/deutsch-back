import { Lesson } from "../../lessons/entities/lesson.entity";
import { Topic } from "../../topics/entities/topic.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subtopic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    icon: string;

    @Column()
    path: string;

    @ManyToOne(() => Topic, (topic) => topic.subtopics, { nullable: true, onDelete: 'CASCADE' })
    topic: Topic;

    @OneToOne(() => Lesson, (lesson) => lesson.subtopic)
    lesson: Lesson;
}
