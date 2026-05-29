
import { Column, Entity, OneToMany } from 'typeorm';
import { Element } from './element.entity';
import { FillBlankTableRow } from './fill-blank-table-row.entity';

@Entity()
export class FillBlankTableExercise extends Element {
    @Column({ nullable: true })
    baseStyle: string;

    @Column('simple-array', { nullable: true })
    headers: string[];

    @OneToMany(() => FillBlankTableRow, (row) => row.exercise)
    rows: FillBlankTableRow[];
}