import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { FillBlankExercise } from './fill-blank-exercise.entity';

@Entity()
export class FillBlankRow {
    @PrimaryGeneratedColumn()
    id: number;

    /** Full sentence with ___ marking each blank. E.g. "Der Mann ___ nach Hause ___.". */
    @Column({ type: 'text' })
    sentence: string;

    /** Correct answers for each blank in order. */
    @Column('simple-array')
    answers: string[];

    @ManyToOne(() => FillBlankExercise, (exercise) => exercise.rows, { onDelete: 'CASCADE' })
    exercise: FillBlankExercise;
}
