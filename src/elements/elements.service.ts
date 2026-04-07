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
import { Tag } from './entities/tag.entity';

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
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) { }


  createLesson(createBodyLessonDto: CreateBodyLessonDto) {
    const elements = createBodyLessonDto.elements.map(async elementDto => {
      elementDto.lesson = createBodyLessonDto.lesson;

      switch (elementDto.type) {
        case 'title': return this.handleTitle(elementDto as CreateTitleDto);
        case 'subtitle': return this.handleSubtitle(elementDto as CreateSubtitleDto);
        case 'unorderedList': return this.handleUnorderedList(elementDto as CreateUnorderedListDto);
        case 'tag': return this.handleTag(elementDto as CreateElementDto);
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
        return this.unorderedListRepository.find({ where: { lesson: { id: lessonId } }, relations: ['list'] });
      case 'tag':
        return this.tagRepository.find({ where: { lesson: { id: lessonId } } });
      default:
        return this.elementRepository.find({ where: { lesson: { id: lessonId } } });
    }
  }




  private async handleTitle(titleDto: CreateTitleDto) {

    // Verify if the title should be deleted
    if (titleDto.delete) {
      await this.titleRepository.delete({ id: titleDto.id });
      return null;
    }


    // If the title has an ID, it means we are updating an existing title
    if (titleDto.id > 0) {
      const existingTitle = await this.titleRepository.findOneBy({ id: titleDto.id }) as Title;
      const element = titleDto as CreateTitleDto;
      // Update the existing title with new data
      existingTitle.text = element.text;
      existingTitle.style = element.style;
      existingTitle.baseStyle = element.baseStyle;
      return this.titleRepository.save(existingTitle);

    }

    // If the title does not have an ID, we are creating a new title
    return this.titleRepository.save(
      this.titleRepository.create(titleDto as CreateTitleDto),
    );

  }

  private async handleSubtitle(subtitleDto: CreateSubtitleDto) {
    // Verify if the subtitle should be deleted
    if (subtitleDto.delete) {
      await this.subtitleRepository.delete({ id: subtitleDto.id });
      return null;
    }


    // If the subtitle has an ID, it means we are updating an existing subtitle
    if (subtitleDto.id > 0) {
      const existingSubtitle = await this.subtitleRepository.findOneBy({ id: subtitleDto.id }) as Subtitle;
      const element = subtitleDto as CreateSubtitleDto;
      // Update the existing subtitle with new data
      existingSubtitle.text = element.text;
      existingSubtitle.style = element.style;
      existingSubtitle.baseStyle = element.baseStyle;
      return this.subtitleRepository.save(existingSubtitle);
    }


    // If the subtitle does not have an ID, we are creating a new subtitle
    return this.subtitleRepository.save(
      this.subtitleRepository.create(subtitleDto as CreateSubtitleDto),
    );

  }

  private async handleUnorderedList(ulDto: CreateUnorderedListDto) {
    // Verify if the unordered list should be deleted
    if (ulDto.delete) {
      // First delete all list items associated with the unordered list
      await this.listItemRepository.delete({ ul: { id: ulDto.id } });
      // Then delete the unordered list itself
      await this.unorderedListRepository.delete({ id: ulDto.id });
      return null;
    }

    // If the unordered list has an ID, it means we are updating an existing unordered list
    if (ulDto.id > 0) {
      const existingUl = await this.unorderedListRepository.findOne({ where: { id: ulDto.id }, relations: ['list'] }) as UnorderedList;
      const element = ulDto as CreateUnorderedListDto;
      // Update the existing unordered list with new data
      existingUl.style = element.style;
      existingUl.baseStyle = element.baseStyle;
      const updatedUl = await this.unorderedListRepository.save(existingUl);
      // Handle list items
      const existingListItems = existingUl.list;
      const updatedListItems = element.list;

      //Delete all list items
      await this.listItemRepository.delete({ ul: { id: existingUl.id } });

      // Create new list items
      for (const itemDto of updatedListItems) {
        const newItem = this.listItemRepository.create(itemDto);
        newItem.lesson = existingUl.lesson;
        newItem.ul = updatedUl;
        delete newItem.id;
        await this.listItemRepository.save(newItem);
      }

      return updatedUl;

      // Delete list items that are not in the updated list
      // const listItemIdsToDelete = existingListItems
      //   .filter(item => !updatedListItems.some(updatedItem => updatedItem.id === item.id))
      //   .map(item => item.id);
      // if (listItemIdsToDelete.length > 0) {
      //   await this.listItemRepository.delete(listItemIdsToDelete);
      // }

      // // Update existing list items and create new ones
      // for (const itemDto of updatedListItems) {
      //   if (itemDto.id > 0) {
      //     // Update existing list item
      //     const existingItem = await this.listItemRepository.findOneBy({ id: itemDto.id }) as ListItem;
      //     existingItem.text = itemDto.text;
      //     existingItem.style = itemDto.style;
      //     existingItem.baseStyle = itemDto.baseStyle;
      //     await this.listItemRepository.save(existingItem);
      //   } else {
      //     // Create new list item
      //     const newItem = this.listItemRepository.create(itemDto);
      //     newItem.lesson = existingUl.lesson;
      //     newItem.ul = updatedUl;
      //     await this.listItemRepository.save(newItem);
      //   }
      // }


    }


    // If the unordered list does not have an ID, we are creating a new unordered list
    const dto = ulDto as CreateUnorderedListDto;
    // Delete id property to dto
    delete dto.id;

    const ul = await this.unorderedListRepository.save(
      this.elementRepository.create(dto),
    ) as UnorderedList;

    dto.list.map(item => {
      item.lesson = ul.lesson;
      item.ul = ul;
      delete item.id;

      this.listItemRepository.save(
        this.listItemRepository.create(item)
      );
    });
    return ul;
  }

  private async handleTag(tagDto: CreateElementDto) {
    // Verify if the tag should be deleted
    if (tagDto.delete) {
      await this.tagRepository.delete({ id: tagDto.id });
      return null;
    }

    // If the tag has an ID, it means we are updating an existing tag
    if (tagDto.id > 0) {
      const existingTag = await this.tagRepository.findOneBy({ id: tagDto.id }) as Tag;
      const element = tagDto as CreateElementDto;
      // Update the existing tag with new data
      existingTag.text = element.text;
      existingTag.style = element.style;
      return this.tagRepository.save(existingTag);
    }

    // If the tag does not have an ID, we are creating a new tag
    delete tagDto.id;
    return this.tagRepository.save(
      this.tagRepository.create(tagDto as CreateElementDto),
    );
  }
}
