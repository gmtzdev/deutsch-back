import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Level {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    icon: string;

    @Column()
    tag: string;

    @Column({ default: 0 })
    lessonNumber: number;
}
