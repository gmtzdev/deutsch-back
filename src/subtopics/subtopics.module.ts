import { Module } from '@nestjs/common';
import { SubtopicsService } from './subtopics.service';
import { SubtopicsController } from './subtopics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtopic } from './entities/subtopic.entity';
import { ElementsModule } from 'src/elements/elements.module';
import { LessonsModule } from 'src/lessons/lessons.module';

@Module({
  controllers: [SubtopicsController],
  providers: [SubtopicsService],
  imports: [
    TypeOrmModule.forFeature([Subtopic]),
    ElementsModule,
    LessonsModule
  ]
})
export class SubtopicsModule { }
