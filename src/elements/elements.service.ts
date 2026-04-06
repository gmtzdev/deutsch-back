import { Injectable } from '@nestjs/common';
import { CreateElementDto } from './dto/create-element.dto';
import { UpdateElementDto } from './dto/update-element.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Element } from './entities/element.entity';
import { Title } from './entities/title.entity';
import { Subtitle } from './entities/subtitle.entity';
import { CreateBodyLessonDto } from './dto/create-body-lesson.dto';
import { CreateTitleDto } from './dto/title/create-title.dto';
import { CreateSubtitleDto } from './dto/subtitle/create-title.dto';
import { CreateUnorderedListDto } from './dto/unorderedlist/create-title.dto';
import { UnorderedList } from './entities/unorderedlist';
import { ListItem } from './entities/listitem.entity';

@Injectable()
export class ElementsService {
  constructor(
    @InjectRepository(Element)
    private readonly elementRepository: Repository<Element>,
    @InjectRepository(Title)
    private readonly titleRepository: Repository<Title>,
    @InjectRepository(Subtitle)
    private readonly subtitleRepository: Repository<Subtitle>,
    @InjectRepository(UnorderedList)
    private readonly unorderedListRepository: Repository<UnorderedList>,
    @InjectRepository(ListItem)
    private readonly listItemRepository: Repository<ListItem>,
  ) { }


  createLesson(createBodyLessonDto: CreateBodyLessonDto) {
    const elements = createBodyLessonDto.elements.map(async elementDto => {
      elementDto.lesson = createBodyLessonDto.lesson;
      switch (elementDto.type) {
        case 'title':
          return this.titleRepository.save(
            this.titleRepository.create(elementDto as CreateTitleDto),
          );
        case 'subtitle':
          return this.subtitleRepository.save(
            this.subtitleRepository.create(elementDto as CreateSubtitleDto),
          );
        case 'unorderedList':
          const dto = elementDto as CreateUnorderedListDto;
          const ul = await this.unorderedListRepository.save(
            this.elementRepository.create(dto),
          ) as UnorderedList;

          dto.list.map(item => {
            item.lesson = createBodyLessonDto.lesson;
            item.ul = ul;
            this.listItemRepository.save(
              this.listItemRepository.create(item)
            );
          });

        default:
          return this.elementRepository.save(
            this.elementRepository.create(elementDto as CreateElementDto),
          );
      }
    });
    return Promise.all(elements);
  }

  create(createElementDto: CreateElementDto) {
    return 'This action adds a new element';
  }

  findAll() {
    return this.elementRepository.find();
  }

  findOne(id: number) {
    return this.elementRepository.findOneBy({ id });
  }

  update(id: number, updateElementDto: UpdateElementDto) {
    return `This action updates a #${id} element`;
  }

  remove(id: number) {
    return `This action removes a #${id} element`;
  }

  getElementsByLessonId(lessonId: number, type: string) {
    switch (type) {
      case 'title':
        return this.titleRepository.find({ where: { lesson: { id: lessonId } } });
      case 'subtitle':
        return this.subtitleRepository.find({ where: { lesson: { id: lessonId } } });
      case 'unorderedList':
        console.log('Si pasa por aqui')
        return this.unorderedListRepository.find({ where: { lesson: { id: lessonId } }, relations: ['list'] });
      default:
        return this.elementRepository.find({ where: { lesson: { id: lessonId } } });
    }
  }
}
