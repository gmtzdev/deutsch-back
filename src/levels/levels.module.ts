import { Module } from '@nestjs/common';
import { LevelsService } from './levels.service';
import { LevelsController } from './levels.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Level } from './entities/level.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [LevelsController],
  providers: [LevelsService],
  imports: [
    TypeOrmModule.forFeature([Level]),
    AuthModule
  ],
  exports: [LevelsService],
})
export class LevelsModule { }
