import { Column, Entity, OneToMany } from "typeorm";
import { Element } from "./element.entity";
import { ListItem } from "./listitem.entity";

@Entity()
export class UnorderedList extends Element {
    @Column({ nullable: false, default: 'ul' })
    baseStyle: string;

    @OneToMany(() => ListItem, (listItem) => listItem.ul, { cascade: true })
    list: ListItem[];
}