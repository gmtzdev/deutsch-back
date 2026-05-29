import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FillBlankTableExercise } from './fill-blank-table.entity';

@Entity()
export class FillBlankTableRow {
    @PrimaryGeneratedColumn()
    id: number;

    /** Full sentence with ___ marking each blank. E.g. "Der Mann ___ nach Hause ___.". */
    @Column({ type: 'text' })
    sentence: string;

    /** Correct answers for each blank in order. */
    @Column('simple-array', { nullable: true })
    answers: string[];

    @ManyToOne(() => FillBlankTableExercise, (exercise) => exercise.rows, { onDelete: 'CASCADE' })
    exercise: FillBlankTableExercise;
}
