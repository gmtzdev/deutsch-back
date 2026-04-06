import { Column, Entity } from "typeorm";
import { Element } from "./element.entity";

@Entity()
export class Title extends Element {
    @Column({ nullable: false, default: 'title' })
    baseStyle: string;
}