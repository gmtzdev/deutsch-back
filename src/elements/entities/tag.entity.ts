import { Entity } from "typeorm";
import { Element } from "./element.entity";

@Entity()
export class Tag extends Element { }