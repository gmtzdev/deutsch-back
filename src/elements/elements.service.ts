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
import { Table } from './entities/table.entity';
import { TableRow } from './entities/tablerow.entity';
import { CreateTableDto } from './dto/table/create-table.dto';
import { Conjugation } from './entities/conjugation.entity';
import { VerbData } from './entities/verb-data.entity';
import { ConjugationRow } from './entities/conjugation-row.entity';
import { CreateConjugationDto } from './dto/conjugation/create-conjugation.dto';
import { Quiz } from './entities/quiz.entity';
import { QuizQuestion } from './entities/quiz-question.entity';
import { CreateQuizDto } from './dto/quiz/create-quiz.dto';
import { ImageBlock } from './entities/image-bock.entity';
import { CreateImageBlockDto } from './dto/image-block/create-image-block.dto';

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
    @InjectRepository(Table)
    private readonly tableRepository: Repository<Table>,
    @InjectRepository(TableRow)
    private readonly tableRowRepository: Repository<TableRow>,
    @InjectRepository(Conjugation)
    private readonly conjugationRepository: Repository<Conjugation>,
    @InjectRepository(VerbData)
    private readonly verbDataRepository: Repository<VerbData>,
    @InjectRepository(ConjugationRow)
    private readonly conjugationRowRepository: Repository<ConjugationRow>,
    @InjectRepository(Quiz)
    private readonly quizRepository: Repository<Quiz>,
    @InjectRepository(QuizQuestion)
    private readonly quizQuestionRepository: Repository<QuizQuestion>,
    @InjectRepository(ImageBlock)
    private readonly imageBlockRepository: Repository<ImageBlock>,
  ) { }


  createLesson(createBodyLessonDto: CreateBodyLessonDto) {
    const elements = createBodyLessonDto.elements.map(async elementDto => {
      elementDto.lesson = createBodyLessonDto.lesson;

      switch (elementDto.type) {
        case 'title': return this.handleTitle(elementDto as CreateTitleDto);
        case 'subtitle': return this.handleSubtitle(elementDto as CreateSubtitleDto);
        case 'unorderedList': return this.handleUnorderedList(elementDto as CreateUnorderedListDto);
        case 'table': return this.handleTable(elementDto as CreateTableDto);
        case 'conjugation': return this.handleConjugation(elementDto as CreateConjugationDto);
        case 'quiz': return this.handleQuiz(elementDto as CreateQuizDto);
        case 'imageBlock': return this.handleImageBlock(elementDto as CreateImageBlockDto);
        case 'tag': return this.handleTag(elementDto as CreateElementDto);
        default: return this.handleElement(elementDto);

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
      case 'element':
        return this.elementRepository.find({ where: { lesson: { id: lessonId } } });
      case 'title':
        return this.titleRepository.find({ where: { lesson: { id: lessonId } } });
      case 'subtitle':
        return this.subtitleRepository.find({ where: { lesson: { id: lessonId } } });
      case 'unorderedList':
        return this.unorderedListRepository.find({ where: { lesson: { id: lessonId } }, relations: ['list'] });
      case 'tag':
        return this.tagRepository.find({ where: { lesson: { id: lessonId } } });
      case 'table':
        return this.tableRepository.find({ where: { lesson: { id: lessonId } }, relations: ['rows'] });
      case 'conjugation':
        return this.conjugationRepository.find({ where: { lesson: { id: lessonId } }, relations: ['verbs', 'verbs.rows'] });
      case 'quiz':
        return this.quizRepository.find({ where: { lesson: { id: lessonId } }, relations: ['questions'] });
      default:
        return null;
    }
  }


  private async handleElement(elementDto: CreateElementDto) {
    // Verify if the element should be deleted
    if (elementDto.delete) {
      await this.elementRepository.delete({ id: elementDto.id });
      return null;
    }

    // If the element has an ID, it means we are updating an existing element
    if (elementDto.id > 0) {
      const existingElement = await this.elementRepository.findOneBy({ id: elementDto.id }) as Element;
      // Update the existing element with new data
      existingElement.text = elementDto.text;
      existingElement.style = elementDto.style;
      return this.elementRepository.save(existingElement);
    }

    // If the element does not have an ID, we are creating a new element
    delete elementDto.id;
    return this.elementRepository.save(
      this.elementRepository.create(elementDto),
    );
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
    delete subtitleDto.id;
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

  private async handleTable(tableDto: CreateTableDto) {
    // Verify if the table should be deleted
    if (tableDto.delete) {
      await this.tableRowRepository.delete({ table: { id: tableDto.id } });
      await this.tableRepository.delete({ id: tableDto.id });
      return null;
    }

    // If the table has an ID, we are updating an existing table
    if (tableDto.id > 0) {
      const existingTable = await this.tableRepository.findOne({ where: { id: tableDto.id }, relations: ['rows'] }) as Table;
      existingTable.style = tableDto.style;
      existingTable.baseStyle = tableDto.baseStyle;
      existingTable.headers = tableDto.headers;
      const updatedTable = await this.tableRepository.save(existingTable);

      // Replace all rows
      await this.tableRowRepository.delete({ table: { id: existingTable.id } });
      for (const rowDto of tableDto.rows) {
        const newRow = this.tableRowRepository.create(rowDto);
        newRow.table = updatedTable;
        delete newRow.id;
        await this.tableRowRepository.save(newRow);
      }

      return updatedTable;
    }

    // Creating a new table
    const dto = { ...tableDto } as any;
    delete dto.id;
    delete dto.rows;

    const table = await this.tableRepository.save(
      this.tableRepository.create(dto),
    ) as unknown as Table;

    for (const rowDto of tableDto.rows) {
      const newRow = this.tableRowRepository.create(rowDto);
      newRow.table = table;
      await this.tableRowRepository.save(newRow);
    }

    return table;
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

  private async handleConjugation(conjugationDto: CreateConjugationDto) {
    // Verify if the conjugation should be deleted
    if (conjugationDto.delete) {
      const existing = await this.conjugationRepository.findOne({ where: { id: conjugationDto.id }, relations: ['verbs', 'verbs.rows'] });
      if (existing) {
        for (const verb of existing.verbs) {
          await this.conjugationRowRepository.delete({ verbData: { id: verb.id } });
        }
        await this.verbDataRepository.delete({ conjugation: { id: existing.id } });
        await this.conjugationRepository.delete({ id: existing.id });
      }
      return null;
    }

    // Updating an existing conjugation
    if (conjugationDto.id > 0) {
      const existing = await this.conjugationRepository.findOne({ where: { id: conjugationDto.id }, relations: ['verbs', 'verbs.rows'] }) as Conjugation;
      existing.style = conjugationDto.style;
      const updatedConjugation = await this.conjugationRepository.save(existing);

      // Replace all verbs and their rows
      for (const verb of existing.verbs) {
        await this.conjugationRowRepository.delete({ verbData: { id: verb.id } });
      }
      await this.verbDataRepository.delete({ conjugation: { id: existing.id } });

      for (const verbDto of conjugationDto.verbs) {
        const verbData = this.verbDataRepository.create({ name: verbDto.name, conjugation: updatedConjugation });
        const savedVerb = await this.verbDataRepository.save(verbData);
        for (const rowDto of verbDto.rows) {
          const row = this.conjugationRowRepository.create({ ...rowDto, verbData: savedVerb });
          await this.conjugationRowRepository.save(row);
        }
      }

      return updatedConjugation;
    }

    // Creating a new conjugation
    const dto = { ...conjugationDto } as any;
    delete dto.id;
    delete dto.verbs;

    const conjugation = await this.conjugationRepository.save(
      this.conjugationRepository.create(dto),
    ) as unknown as Conjugation;

    for (const verbDto of conjugationDto.verbs) {
      const verbData = this.verbDataRepository.create({ name: verbDto.name, conjugation });
      const savedVerb = await this.verbDataRepository.save(verbData);
      for (const rowDto of verbDto.rows) {
        const row = this.conjugationRowRepository.create({ ...rowDto, verbData: savedVerb });
        await this.conjugationRowRepository.save(row);
      }
    }

    return conjugation;
  }

  private async handleQuiz(quizDto: CreateQuizDto) {
    // Delete
    if (quizDto.delete) {
      await this.quizQuestionRepository.delete({ quiz: { id: quizDto.id } });
      await this.quizRepository.delete({ id: quizDto.id });
      return null;
    }

    // Update
    if (quizDto.id > 0) {
      const existing = await this.quizRepository.findOne({ where: { id: quizDto.id }, relations: ['questions'] }) as Quiz;
      existing.style = quizDto.style;
      const updatedQuiz = await this.quizRepository.save(existing);

      await this.quizQuestionRepository.delete({ quiz: { id: existing.id } });
      for (const qDto of quizDto.questions) {
        const question = this.quizQuestionRepository.create({ ...qDto, quiz: updatedQuiz });
        await this.quizQuestionRepository.save(question);
      }

      return updatedQuiz;
    }

    // Create
    const dto = { ...quizDto } as any;
    delete dto.id;
    delete dto.questions;

    const quiz = await this.quizRepository.save(
      this.quizRepository.create(dto),
    ) as unknown as Quiz;

    for (const qDto of quizDto.questions) {
      const question = this.quizQuestionRepository.create({ ...qDto, quiz });
      await this.quizQuestionRepository.save(question);
    }

    return quiz;
  }

  private async handleImageBlock(imageBlockDto: CreateImageBlockDto) {
    if (imageBlockDto.delete) {
      await this.imageBlockRepository.delete({ id: imageBlockDto.id });
      return null;
    }

    if (imageBlockDto.id > 0) {
      const existing = await this.imageBlockRepository.findOneBy({ id: imageBlockDto.id }) as ImageBlock;
      existing.text = imageBlockDto.text;
      existing.style = imageBlockDto.style;
      return this.imageBlockRepository.save(existing);
    }

    const dto = { ...imageBlockDto } as any;
    delete dto.id;
    return this.imageBlockRepository.save(
      this.imageBlockRepository.create(dto),
    );
  }
}
