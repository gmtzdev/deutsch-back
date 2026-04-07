import { Column, Entity, OneToMany } from "typeorm";
import { Element } from "./element.entity";
import { TableRow } from "./tablerow.entity";

@Entity()
export class Table extends Element {
    @Column({ nullable: true })
    baseStyle: string;

    @Column("simple-array", { nullable: true })
    headers: string[];

    @OneToMany(() => TableRow, (row) => row.table, { cascade: true })
    rows: TableRow[];
}