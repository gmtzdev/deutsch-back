import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupsService } from './groups.service';
import { GroupsController } from './groups.controller';
import { Group } from './entities/group.entity';
import { User } from '../auth/entities/user.entity';
import { Level } from '../levels/entities/level.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Group, User, Level])],
  controllers: [GroupsController],
  providers: [GroupsService],
})
export class GroupsModule { }
