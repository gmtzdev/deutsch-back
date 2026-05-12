import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { PronunciationBlock } from "./pronunciation-block.entity";

@Entity()
export class PronunciationItem {
    @PrimaryGeneratedColumn()
    id: number;
    /** Texto que se reproducirá con voz */
    @Column()
    text: string;
    /** Etiqueta visible (si está vacía se muestra `text`) */
    @Column({ nullable: true })
    label: string;

    @ManyToOne(() => PronunciationBlock, (block) => block.items, { onDelete: 'CASCADE' })
    block: PronunciationBlock;
}