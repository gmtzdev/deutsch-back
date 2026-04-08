import { Level } from "../../levels/entities/level.entity";
import { Subtopic } from "../../subtopics/entities/subtopic.entity";
import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Topic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    subtitle: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => Level, (level) => level.topics, { nullable: true, onDelete: 'CASCADE' })
    level: Level;

    @OneToMany(() => Subtopic, (subtopic) => subtopic.topic)
    subtopics: Subtopic[];
}
