import { Module } from '@nestjs/common';
import { SubtopicsService } from './subtopics.service';
import { SubtopicsController } from './subtopics.controller';

@Module({
  controllers: [SubtopicsController],
  providers: [SubtopicsService],
})
export class SubtopicsModule {}
