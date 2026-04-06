import { Lesson } from "../../lessons/entities/lesson.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ElementType } from "../types/types";

@Entity()
export class Element {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: true })
    text: string;

    @Column({ type: 'text', nullable: true })
    style: string;

    @Column({ nullable: false })
    type: ElementType;

    @ManyToOne(() => Lesson, (lesson) => lesson.elements, { onDelete: 'CASCADE' })
    lesson: Lesson;
}
