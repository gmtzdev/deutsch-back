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

@Module({
  controllers: [ElementsController],
  providers: [ElementsService],
  imports: [TypeOrmModule.forFeature([Element, Title, Subtitle, ListItem, UnorderedList, Tag
  ])],
  exports: [ElementsService],
})
export class ElementsModule { }
