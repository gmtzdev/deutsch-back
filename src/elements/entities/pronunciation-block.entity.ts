
import { Entity, OneToMany } from 'typeorm';
import { Element } from './element.entity';
import { PronunciationItem } from './pronunciation-item.entity';

@Entity()
export class PronunciationBlock extends Element {
    @OneToMany(() => PronunciationItem, (item) => item.block, { cascade: true })
    items: PronunciationItem[];
}
