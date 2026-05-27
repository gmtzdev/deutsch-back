import { Entity, OneToMany } from 'typeorm';
import { Element } from './element.entity';
import { FillBlankRow } from './fill-blank-row.entity';

@Entity()
export class FillBlankExercise extends Element {
    @OneToMany(() => FillBlankRow, (row) => row.exercise)
    rows: FillBlankRow[];
}
