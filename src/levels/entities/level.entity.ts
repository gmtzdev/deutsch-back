import { Topic } from "../../topics/entities/topic.entity";
import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class Level {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column({ length: 500 })
    icon: string;

    @Column()
    tag: string;

    @Column({ default: 0 })
    lessonNumber: number;

    @Column({ default: true })
    visible: boolean;

    @Column({ nullable: true })
    color: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @OneToMany(() => Topic, (topic) => topic.level)
    topics: Topic[];
}
