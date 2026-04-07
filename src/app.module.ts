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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'lalo',
      password: 'laura',
      database: 'deutschapp',
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
        Tag
      ],
      synchronize: true,
    }),

    ElementsModule,

    LevelsModule,

    TopicsModule,

    SubtopicsModule,

    LessonsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
