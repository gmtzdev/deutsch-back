import { Element } from "./element.entity";
import { TableRow } from "./tablerow.entity";

export class Table extends Element {
    baseStyle: string;
    headers: string[];
    rows: TableRow[];
}