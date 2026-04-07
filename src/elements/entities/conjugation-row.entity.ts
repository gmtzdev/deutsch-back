import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { VerbData } from './verb-data.entity';

@Entity()
export class ConjugationRow {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    pronoun: string;

    @Column()
    verb: string;

    @Column({ nullable: true })
    ending: string;

    @ManyToOne(() => VerbData, (verbData) => verbData.rows, { onDelete: 'CASCADE' })
    verbData: VerbData;
}
