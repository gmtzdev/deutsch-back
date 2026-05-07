import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { LevelsController } from './levels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';

@Module({
  controllers: [LevelsController],
  providers: [LevelsService],
  imports: [
    TypeOrmModule.forFeature([Level])
  ],
  exports: [LevelsService],
})
export class LevelsModule { }
