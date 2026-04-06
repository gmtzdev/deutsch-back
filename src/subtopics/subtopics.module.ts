import { Module } from '@nestjs/common';
import { SubtopicsService } from './subtopics.service';
import { SubtopicsController } from './subtopics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtopic } from './entities/subtopic.entity';
import { ElementsModule } from 'src/elements/elements.module';

@Module({
  controllers: [SubtopicsController],
  providers: [SubtopicsService],
  imports: [
    TypeOrmModule.forFeature([Subtopic]),
    ElementsModule,
  ]
})
export class SubtopicsModule { }
