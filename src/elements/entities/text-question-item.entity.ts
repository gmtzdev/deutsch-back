import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TextQuestionExercise } from './text-question-exercise.entity';

@Entity()
export class TextQuestionItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'text' })
    question: string;

    @Column({ type: 'text' })
    answer: string;

    @ManyToOne(() => TextQuestionExercise, (exercise) => exercise.questions, { onDelete: 'CASCADE' })
    exercise: TextQuestionExercise;
}