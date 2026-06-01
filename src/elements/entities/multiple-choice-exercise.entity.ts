import { Entity, OneToMany } from 'typeorm';
import { Element } from './element.entity';
import { MultipleChoiceQuestion } from './multiple-choice-question.entity';

@Entity()
export class MultipleChoiceExercise extends Element {
    @OneToMany(() => MultipleChoiceQuestion, (question) => question.exercise)
    questions: MultipleChoiceQuestion[];
}
