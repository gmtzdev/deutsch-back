import { Column, Entity } from "typeorm";
import { Element } from "./element.entity";

@Entity()
export class Subtitle extends Element {
    @Column({ nullable: false, default: 'subtitle text-indications' })
    baseStyle: string;
}