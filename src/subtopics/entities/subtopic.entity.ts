import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Subtopic {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    icon: string;
}
