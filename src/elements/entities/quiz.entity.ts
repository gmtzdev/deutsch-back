import { Entity, OneToMany } from 'typeorm';
import { Element } from './element.entity';
import { QuizQuestion } from './quiz-question.entity';

@Entity()
export class Quiz extends Element {
    @OneToMany(() => QuizQuestion, (question) => question.quiz, { cascade: true })
    questions: QuizQuestion[];
}
