import { Entity, OneToMany } from 'typeorm';
import { Element } from './element.entity';
import { TextQuestionItem } from './text-question-item.entity';

@Entity()
export class TextQuestionExercise extends Element {
    @OneToMany(() => TextQuestionItem, (question) => question.exercise)
    questions: TextQuestionItem[];
}