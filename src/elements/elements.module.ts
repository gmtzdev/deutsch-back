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
import { ImageBlock } from './entities/image-bock.entity';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { DragDropExercise } from './entities/drag-drop-exercise.entity';
import { DragDropRow } from './entities/drag-drop-row.entity';
import { PronunciationBlock } from './entities/pronunciation-block.entity';
import { PronunciationItem } from './entities/pronunciation-item.entity';
import { AlphabetBlock } from './entities/alphabet-block.entity';
import { Tip } from './entities/tip.entity';
import { FillBlankExercise } from './entities/fill-blank-exercise.entity';
import { FillBlankRow } from './entities/fill-blank-row.entity';
import { FillBlankTableExercise } from './entities/fill-blank-table.entity';
import { FillBlankTableRow } from './entities/fill-blank-table-row.entity';
import { TextQuestionExercise } from './entities/text-question-exercise.entity';
import { TextQuestionItem } from './entities/text-question-item.entity';

@Module({
  controllers: [ElementsController],
  providers: [ElementsService],
  imports: [
    TypeOrmModule.forFeature([Element, Title, Subtitle, ListItem, UnorderedList, Tag, Table, TableRow, Conjugation, VerbData, ConjugationRow, Quiz, QuizQuestion, ImageBlock, DragDropExercise, DragDropRow, PronunciationBlock, PronunciationItem, AlphabetBlock, Tip, FillBlankExercise, FillBlankRow, FillBlankTableExercise, FillBlankTableRow, TextQuestionExercise, TextQuestionItem]),
    MulterModule.register({
      storage: diskStorage({
        destination: './uploads',
        filename: (_req, file, cb) => {
          const unique = `${Date.now()}-${Math.round(Math.random() * 1e6)}`;
          cb(null, `${unique}${extname(file.originalname)}`);
        },
      }),
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.match(/^image\//)) {
          return cb(new Error('Only image files are allowed'), false);
        }
        cb(null, true);
      },
      limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
    }),
  ],
  exports: [ElementsService],
})
export class ElementsModule { }
