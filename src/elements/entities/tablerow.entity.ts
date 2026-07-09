import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Table } from "./table.entity";

@Entity()
export class TableRow {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    cells: string;

    @ManyToOne(() => Table, (table) => table.rows, { onDelete: 'CASCADE' })
    table: Table;
}
