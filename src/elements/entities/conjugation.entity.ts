import { Entity, OneToMany } from 'typeorm';
import { Element } from './element.entity';
import { VerbData } from './verb-data.entity';

@Entity()
export class Conjugation extends Element {
    @OneToMany(() => VerbData, (verb) => verb.conjugation)
    verbs: VerbData[];
}
