import { Module } from '@nestjs/common';
import { ElementsService } from './elements.service';
import { ElementsController } from './elements.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Element } from './entities/element.entity';
import { Title } from './entities/title.entity';
import { Subtitle } from './entities/subtitle.entity';
import { ListItem } from './entities/listitem.entity';
import { UnorderedList } from './entities/unorderedlist';
import { Tag } from './entities/tag.entity';
import { Table } from './entities/table.entity';
import { TableRow } from './entities/tablerow.entity';
import { Conjugation } from './entities/conjugation.entity';
import { VerbData } from './entities/verb-data.entity';
import { ConjugationRow } from './entities/conjugation-row.entity';
import { Quiz } from './entities/quiz.entity';
import { QuizQuestion } from './entities/quiz-question.entity';

@Module({
  controllers: [ElementsController],
  providers: [ElementsService],
  imports: [TypeOrmModule.forFeature([Element, Title, Subtitle, ListItem, UnorderedList, Tag, Table, TableRow, Conjugation, VerbData, ConjugationRow, Quiz, QuizQuestion
  ])],
  exports: [ElementsService],
})
export class ElementsModule { }
