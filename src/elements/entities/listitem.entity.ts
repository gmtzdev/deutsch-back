import { Column, Entity, ManyToOne } from "typeorm";
import { Element } from "./element.entity";
import { UnorderedList } from "./unorderedlist";

@Entity()
export class ListItem extends Element {
    @Column({ nullable: false, default: 'li' })
    baseStyle: string;

    @ManyToOne(() => UnorderedList, (unorderedList) => unorderedList.list, { onDelete: 'CASCADE' })
    ul: UnorderedList;

}