import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DragDropExercise } from './drag-drop-exercise.entity';

@Entity()
export class DragDropRow {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    before: string;

    @Column({ nullable: true })
    after: string;

    @Column()
    answer: string;

    @ManyToOne(() => DragDropExercise, (exercise) => exercise.rows, { onDelete: 'CASCADE' })
    exercise: DragDropExercise;
}
