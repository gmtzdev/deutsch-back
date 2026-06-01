import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MultipleChoiceExercise } from './multiple-choice-exercise.entity';

@Entity()
export class MultipleChoiceQuestion {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    question: string;

    @Column({ type: 'text' })
    options: string;

    @Column({ type: 'int' })
    correctOption: number;

    @ManyToOne(() => MultipleChoiceExercise, (exercise) => exercise.questions, { onDelete: 'CASCADE' })
    exercise: MultipleChoiceExercise;
}
