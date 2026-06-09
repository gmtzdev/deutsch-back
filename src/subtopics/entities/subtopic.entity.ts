import { Lesson } from "../../lessons/entities/lesson.entity";
import { Topic } from "../../topics/entities/topic.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Subtopic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({ default: '' })
    icon: string;

    @Column({ default: '' })
    path: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({ default: 0 })
    order: number;

    @Column({ default: true })
    visible: boolean;

    @ManyToOne(() => Topic, (topic) => topic.subtopics, { nullable: true, onDelete: 'CASCADE' })
    topic: Topic;

    @OneToOne(() => Lesson, (lesson) => lesson.subtopic)
    lesson: Lesson;
}
