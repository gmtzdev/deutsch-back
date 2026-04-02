import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Element {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text', nullable: true })
    text: string;

    @Column({ type: 'text', nullable: true })
    style: string;
}
