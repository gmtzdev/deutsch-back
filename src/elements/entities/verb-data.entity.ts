import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Conjugation } from './conjugation.entity';
import { ConjugationRow } from './conjugation-row.entity';

@Entity()
export class VerbData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToOne(() => Conjugation, (conjugation) => conjugation.verbs, { onDelete: 'CASCADE' })
    conjugation: Conjugation;

    @OneToMany(() => ConjugationRow, (row) => row.verbData)
    rows: ConjugationRow[];
}
