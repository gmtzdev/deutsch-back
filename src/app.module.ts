import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ElementsModule } from './elements/elements.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element } from './elements/entities/element.entity';
import { LevelsModule } from './levels/levels.module';
import { TopicsModule } from './topics/topics.module';
import { SubtopicsModule } from './subtopics/subtopics.module';
import { LessonsModule } from './lessons/lessons.module';
import { Title } from './elements/entities/title.entity';
import { Subtitle } from './elements/entities/subtitle.entity';
import { Level } from './levels/entities/level.entity';
import { Topic } from './topics/entities/topic.entity';
import { Subtopic } from './subtopics/entities/subtopic.entity';
import { Lesson } from './lessons/entities/lesson.entity';
import { ListItem } from './elements/entities/listitem.entity';
import { UnorderedList } from './elements/entities/unorderedlist';
import { Tag } from './elements/entities/tag.entity';
import { Table } from './elements/entities/table.entity';
import { TableRow } from './elements/entities/tablerow.entity';
import { Conjugation } from './elements/entities/conjugation.entity';
import { VerbData } from './elements/entities/verb-data.entity';
import { ConjugationRow } from './elements/entities/conjugation-row.entity';
import { Quiz } from './elements/entities/quiz.entity';
import { QuizQuestion } from './elements/entities/quiz-question.entity';
import { ConfigModule } from '@nestjs/config';
import { DragDropExercise } from './elements/entities/drag-drop-exercise.entity';
import { DragDropRow } from './elements/entities/drag-drop-row.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/entities/user.entity';
import { AdminModule } from './admin/admin.module';
import { AiModule } from './ai/ai.module';
import { PronunciationBlock } from './elements/entities/pronunciation-block.entity';
import { PronunciationItem } from './elements/entities/pronunciation-item.entity';
import { AlphabetBlock } from './elements/entities/alphabet-block.entity';
import { Tip } from './elements/entities/tip.entity';
import { FillBlankExercise } from './elements/entities/fill-blank-exercise.entity';
import { FillBlankRow } from './elements/entities/fill-blank-row.entity';
import { FillBlankTableExercise } from './elements/entities/fill-blank-table.entity';
import { FillBlankTableRow } from './elements/entities/fill-blank-table-row.entity';
import { TextQuestionExercise } from './elements/entities/text-question-exercise.entity';
import { TextQuestionItem } from './elements/entities/text-question-item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),

    TypeOrmModule.forRoot({
      type: process.env.TYPE_DB as any,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 3306),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [
        Level,
        Topic,
        Subtopic,
        Lesson,
        Element,
        Title,
        Subtitle,
        UnorderedList,
        ListItem,
        Tag,
        Table,
        TableRow,
        Conjugation,
        VerbData,
        ConjugationRow,
        Quiz,
        QuizQuestion,
        DragDropExercise,
        DragDropRow,
        PronunciationBlock,
        PronunciationItem,
        AlphabetBlock,
        User,
        Tip,
        FillBlankExercise,
        FillBlankRow,
        FillBlankTableExercise,
        FillBlankTableRow,
        TextQuestionExercise,
        TextQuestionItem,
      ],
      synchronize: true,
    }),

    ElementsModule,
    LevelsModule,
    TopicsModule,
    SubtopicsModule,
    LessonsModule,
    AuthModule,
    AdminModule,
    AiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
