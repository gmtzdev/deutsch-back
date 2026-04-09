
import { Column, Entity, OneToMany } from 'typeorm';
import { DragDropRow } from './drag-drop-row.entity';
import { Element } from './element.entity';

@Entity()
export class DragDropExercise extends Element {
    @Column('simple-array', { nullable: true })
    words: string[];

    @OneToMany(() => DragDropRow, (row) => row.exercise, { cascade: true })
    rows: DragDropRow[];
}
