import { Element } from "../../elements/entities/element.entity";
import { Title } from "../../elements/entities/title.entity";
import { Subtopic } from "../../subtopics/entities/subtopic.entity";
import { Column, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @OneToMany(() => Element, (element) => element.lesson)
    elements: Element[] | Title[];

    @OneToOne(() => Subtopic, (subtopic) => subtopic.lesson, { nullable: true, onDelete: 'CASCADE' })
    @JoinColumn()
    subtopic: Subtopic;

}
