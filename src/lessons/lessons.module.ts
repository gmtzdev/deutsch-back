import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Lesson } from './entities/lesson.entity';

@Module({
  controllers: [LessonsController],
  providers: [LessonsService],
  imports: [
    TypeOrmModule.forFeature([Lesson])
  ],
})
export class LessonsModule { }
