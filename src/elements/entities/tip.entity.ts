import { Column, Entity } from "typeorm";
import { Element } from "./element.entity";

@Entity()
export class Tip extends Element {
    @Column({ nullable: false })
    tipTitle: string;
}