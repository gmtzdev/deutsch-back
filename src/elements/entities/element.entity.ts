import { Lesson } from "../../lessons/entities/lesson.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
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

    @Column({ nullable: false })
    order: number;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Lesson, (lesson) => lesson.elements, { onDelete: 'CASCADE' })
    lesson: Lesson;
}
