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
import { DragDropExercise } from './entities/drag-drop-exercise.entity';
import { DragDropRow } from './entities/drag-drop-row.entity';
import { CreateDragDropDto } from './dto/drag-drop/create-drag-drop.dto';
import { PronunciationBlock } from './entities/pronunciation-block.entity';
import { PronunciationItem } from './entities/pronunciation-item.entity';
import { CreatePronunciationBlockDto } from './dto/pronunciation/create-pronunciation-block.dto';
import { AlphabetBlock } from './entities/alphabet-block.entity';
import { Tip } from './entities/tip.entity';
import { FillBlankExercise } from './entities/fill-blank-exercise.entity';
import { FillBlankRow } from './entities/fill-blank-row.entity';
import { CreateFillBlankDto } from './dto/fill-blank/create-fill-blank.dto';

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
    @InjectRepository(DragDropExercise)
    private readonly dragDropRepository: Repository<DragDropExercise>,
    @InjectRepository(DragDropRow)
    private readonly dragDropRowRepository: Repository<DragDropRow>,
    @InjectRepository(PronunciationBlock)
    private readonly pronunciationBlockRepository: Repository<PronunciationBlock>,
    @InjectRepository(PronunciationItem)
    private readonly pronunciationItemRepository: Repository<PronunciationItem>,
    @InjectRepository(AlphabetBlock)
    private readonly alphabetBlockRepository: Repository<AlphabetBlock>,
    @InjectRepository(Tip)
    private readonly tipRepository: Repository<Tip>,
    @InjectRepository(FillBlankExercise)
    private readonly fillBlankRepository: Repository<FillBlankExercise>,
    @InjectRepository(FillBlankRow)
    private readonly fillBlankRowRepository: Repository<FillBlankRow>,
  ) { }


  async createLesson(createBodyLessonDto: CreateBodyLessonDto) {
    console.log(createBodyLessonDto);
    const results = [];
    for (const elementDto of createBodyLessonDto.elements) {
      elementDto.lesson = createBodyLessonDto.lesson;

      console.log('Processing element:', elementDto);
      let result: any;
      switch (elementDto.type) {
        case 'title': result = await this.handleTitle(elementDto as CreateTitleDto); break;
        case 'subtitle': result = await this.handleSubtitle(elementDto as CreateSubtitleDto); break;
        case 'unorderedList': result = await this.handleUnorderedList(elementDto as CreateUnorderedListDto); break;
        case 'table': result = await this.handleTable(elementDto as CreateTableDto); break;
        case 'conjugation': result = await this.handleConjugation(elementDto as CreateConjugationDto); break;
        case 'quiz': result = await this.handleQuiz(elementDto as CreateQuizDto); break;
        case 'imageBlock': result = await this.handleImageBlock(elementDto as CreateImageBlockDto); break;
        case 'dragDrop': result = await this.handleDragDrop(elementDto as CreateDragDropDto); break;
        case 'pronunciationBlock': result = await this.handlePronunciationBlock(elementDto as CreatePronunciationBlockDto); break;
        case 'alphabetBlock': result = await this.handleAlphabetBlock(elementDto); break;
        case 'tag': result = await this.handleTag(elementDto as CreateElementDto); break;
        case 'tip': result = await this.handleTip(elementDto as CreateElementDto); break;
        case 'fillBlank': result = await this.handleFillBlank(elementDto as CreateFillBlankDto); break;
        default: result = await this.handleElement(elementDto); break;
      }
      results.push(result);
    }
    return results;
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
        return this.unorderedListRepository.find({
          where: { lesson: { id: lessonId } }, relations: ['list'], order: {
            list: {
              id: 'ASC'  // o cualquier campo de ListItem
            }
          }
        });
      case 'tag':
        return this.tagRepository.find({ where: { lesson: { id: lessonId } } });
      case 'table':
        return this.tableRepository.find({
          where: { lesson: { id: lessonId } }, relations: ['rows'], order: {
            rows: {
              id: 'ASC'  // o cualquier campo de TableRow
            }
          }
        });
      case 'conjugation':
        return this.conjugationRepository.find({ where: { lesson: { id: lessonId } }, relations: ['verbs', 'verbs.rows'] });
      case 'quiz':
        return this.quizRepository.find({ where: { lesson: { id: lessonId } }, relations: ['questions'] });
      case 'dragDrop':
        return this.dragDropRepository.find({
          where: { lesson: { id: lessonId } }, relations: ['rows'], order: {
            rows: {
              id: 'ASC'  // o cualquier campo de DragDropRow
            }
          }
        });
      case 'pronunciationBlock':
        return this.pronunciationBlockRepository.find({ where: { lesson: { id: lessonId } }, relations: ['items'] });
      // case 'imageBlock':
      //   return this.imageBlockRepository.find({ where: { lesson: { id: lessonId } } });
      case 'alphabetBlock':
        return this.alphabetBlockRepository.find({ where: { lesson: { id: lessonId } } });
      case 'tip':
        return this.tipRepository.find({ where: { lesson: { id: lessonId } } });
      case 'fillBlank':
        return this.fillBlankRepository.find({
          where: { lesson: { id: lessonId } },
          relations: ['rows'],
          order: { rows: { id: 'ASC' } },
        });
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
      const existingElement = await this.elementRepository.findOneBy({ id: elementDto.id });
      if (!existingElement) return null;
      // Update the existing element with new data
      existingElement.text = elementDto.text;
      existingElement.style = elementDto.style;
      existingElement.order = elementDto.order;
      existingElement.gridId = elementDto.gridId ?? null;
      existingElement.gridCols = elementDto.gridCols ?? 1;
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
      const existingTitle = await this.titleRepository.findOneBy({ id: titleDto.id });
      if (!existingTitle) return null;
      const element = titleDto as CreateTitleDto;
      // Update the existing title with new data
      existingTitle.text = element.text;
      existingTitle.style = element.style;
      existingTitle.order = element.order;
      existingTitle.baseStyle = element.baseStyle;
      existingTitle.gridId = element.gridId ?? null;
      existingTitle.gridCols = element.gridCols ?? 1;
      return this.titleRepository.save(existingTitle);

    }

    // If the title does not have an ID, we are creating a new title
    delete titleDto.id;
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
      const existingSubtitle = await this.subtitleRepository.findOneBy({ id: subtitleDto.id });
      if (!existingSubtitle) return null;
      const element = subtitleDto as CreateSubtitleDto;
      // Update the existing subtitle with new data
      existingSubtitle.text = element.text;
      existingSubtitle.style = element.style;
      existingSubtitle.order = element.order;
      existingSubtitle.baseStyle = element.baseStyle;
      existingSubtitle.gridId = element.gridId ?? null;
      existingSubtitle.gridCols = element.gridCols ?? 1;
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
      const existingUl = await this.unorderedListRepository.findOneBy({ id: ulDto.id });
      if (!existingUl) return null;
      const element = ulDto as CreateUnorderedListDto;
      // Update the existing unordered list with new data
      existingUl.style = element.style;
      existingUl.baseStyle = element.baseStyle;
      existingUl.order = element.order;
      existingUl.gridId = element.gridId ?? null;
      existingUl.gridCols = element.gridCols ?? 1;
      const updatedUl = await this.unorderedListRepository.save(existingUl);
      // Handle list items
      const updatedListItems = element.list;

      //Delete all list items
      await this.listItemRepository.delete({ ul: { id: existingUl.id } });

      // Create new list items
      for (const itemDto of updatedListItems) {
        const newItem = this.listItemRepository.create(itemDto);
        newItem.lesson = ulDto.lesson;
        newItem.ul = updatedUl;
        delete newItem.id;
        await this.listItemRepository.save(newItem);
      }

      console.log('Updated UL:', updatedUl);

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

    const ul = (await this.unorderedListRepository.save(
      this.unorderedListRepository.create({ ...dto, list: undefined } as any),
    ) as unknown) as UnorderedList;

    for (const item of dto.list) {
      const newItem = this.listItemRepository.create(item);
      newItem.lesson = dto.lesson;
      newItem.ul = ul;
      delete newItem.id;
      await this.listItemRepository.save(newItem);
    }
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
      const existingTable = await this.tableRepository.findOneBy({ id: tableDto.id });
      if (!existingTable) return null;
      existingTable.style = tableDto.style;
      existingTable.baseStyle = tableDto.baseStyle;
      existingTable.headers = tableDto.headers;
      existingTable.order = tableDto.order;
      existingTable.gridId = tableDto.gridId ?? null;
      existingTable.gridCols = tableDto.gridCols ?? 1;
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
      const row = { cells: rowDto.cells };
      const newRow = this.tableRowRepository.create(row);
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
      const existingTag = await this.tagRepository.findOneBy({ id: tagDto.id });
      if (!existingTag) return null;
      const element = tagDto as CreateElementDto;
      // Update the existing tag with new data
      existingTag.text = element.text;
      existingTag.style = element.style;
      existingTag.order = element.order;
      existingTag.gridId = element.gridId ?? null;
      existingTag.gridCols = element.gridCols ?? 1;
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
      const existing = await this.conjugationRepository.findOneBy({ id: conjugationDto.id });
      if (!existing) return null;
      existing.style = conjugationDto.style;
      existing.order = conjugationDto.order;
      existing.gridId = conjugationDto.gridId ?? null;
      existing.gridCols = conjugationDto.gridCols ?? 1;
      const updatedConjugation = await this.conjugationRepository.save(existing);

      // Replace all verbs and their rows
      // Deleting verbData cascade-deletes ConjugationRow via onDelete: 'CASCADE'
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
      const existing = await this.quizRepository.findOneBy({ id: quizDto.id });
      if (!existing) return null;
      existing.style = quizDto.style;
      existing.order = quizDto.order;
      existing.gridId = quizDto.gridId ?? null;
      existing.gridCols = quizDto.gridCols ?? 1;
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
      const existing = await this.imageBlockRepository.findOneBy({ id: imageBlockDto.id });
      if (!existing) return null;
      existing.text = imageBlockDto.text;
      existing.style = imageBlockDto.style;
      existing.order = imageBlockDto.order;
      existing.gridId = imageBlockDto.gridId ?? null;
      existing.gridCols = imageBlockDto.gridCols ?? 1;
      return this.imageBlockRepository.save(existing);
    }

    const dto = { ...imageBlockDto } as any;
    delete dto.id;
    return this.imageBlockRepository.save(
      this.imageBlockRepository.create(dto),
    );
  }

  private async handleDragDrop(dragDropDto: CreateDragDropDto) {
    // Delete
    if (dragDropDto.delete) {
      await this.dragDropRowRepository.delete({ exercise: { id: dragDropDto.id } });
      await this.dragDropRepository.delete({ id: dragDropDto.id });
      return null;
    }

    // Update
    if (dragDropDto.id > 0) {
      const existing = await this.dragDropRepository.findOneBy({ id: dragDropDto.id });
      if (!existing) return null;
      existing.style = dragDropDto.style;
      existing.words = dragDropDto.words;
      existing.order = dragDropDto.order;
      existing.gridId = dragDropDto.gridId ?? null;
      existing.gridCols = dragDropDto.gridCols ?? 1;
      const updated = await this.dragDropRepository.save(existing);

      await this.dragDropRowRepository.delete({ exercise: { id: existing.id } });
      for (const rowDto of dragDropDto.rows) {
        const row = this.dragDropRowRepository.create({ ...rowDto, exercise: updated });
        await this.dragDropRowRepository.save(row);
      }

      return updated;
    }

    // Create
    const dto = { ...dragDropDto } as any;
    delete dto.id;
    delete dto.rows;

    const exercise = await this.dragDropRepository.save(
      this.dragDropRepository.create(dto),
    ) as unknown as DragDropExercise;

    for (const rowDto of dragDropDto.rows) {
      const row = this.dragDropRowRepository.create({ ...rowDto, exercise });
      await this.dragDropRowRepository.save(row);
    }

    return exercise;
  }

  private async handlePronunciationBlock(dto: CreatePronunciationBlockDto) {
    // Delete
    if (dto.delete) {
      await this.pronunciationItemRepository.delete({ block: { id: dto.id } });
      await this.pronunciationBlockRepository.delete({ id: dto.id });
      return null;
    }

    // Update
    if (dto.id > 0) {
      const existing = await this.pronunciationBlockRepository.findOneBy({ id: dto.id });
      if (!existing) return null;
      existing.style = dto.style;
      existing.order = dto.order;
      existing.gridId = dto.gridId ?? null;
      existing.gridCols = dto.gridCols ?? 1;
      const updated = await this.pronunciationBlockRepository.save(existing);

      await this.pronunciationItemRepository.delete({ block: { id: existing.id } });
      for (const itemDto of dto.items) {
        const item = this.pronunciationItemRepository.create({ ...itemDto, block: updated });
        delete item.id;
        await this.pronunciationItemRepository.save(item);
      }

      return updated;
    }

    // Create
    const blockDto = { ...dto } as any;
    delete blockDto.id;
    delete blockDto.items;

    const block = await this.pronunciationBlockRepository.save(
      this.pronunciationBlockRepository.create(blockDto),
    ) as unknown as PronunciationBlock;

    for (const itemDto of dto.items) {
      const item = this.pronunciationItemRepository.create({ ...itemDto, block });
      await this.pronunciationItemRepository.save(item);
    }

    return block;
  }

  private async handleAlphabetBlock(dto: CreateElementDto) {
    // Delete
    if (dto.delete) {
      await this.alphabetBlockRepository.delete({ id: dto.id });
      return null;
    }

    // Update
    if (dto.id > 0) {
      const existing = await this.alphabetBlockRepository.findOneBy({ id: dto.id });
      if (!existing) return null;
      existing.style = dto.style;
      existing.order = dto.order;
      existing.gridId = dto.gridId ?? null;
      existing.gridCols = dto.gridCols ?? 1;
      return this.alphabetBlockRepository.save(existing);
    }

    // Create
    const blockDto = { ...dto } as any;
    delete blockDto.id;
    return this.alphabetBlockRepository.save(
      this.alphabetBlockRepository.create(blockDto),
    );
  }

  private async handleTip(tipDto: CreateElementDto) {
    // Verify if the tip should be deleted
    if (tipDto.delete) {
      await this.tipRepository.delete({ id: tipDto.id });
      return null;
    }

    // If the tip has an ID, it means we are updating an existing tip
    if (tipDto.id > 0) {
      const existingTip = await this.tipRepository.findOneBy({ id: tipDto.id });
      if (!existingTip) return null;
      const element = tipDto as CreateElementDto;
      // Update the existing tip with new data
      // existingTip.tipTitle = element.tipTitle;
      existingTip.text = element.text;
      existingTip.style = element.style;
      existingTip.order = element.order;
      existingTip.gridId = element.gridId ?? null;
      existingTip.gridCols = element.gridCols ?? 1;
      return this.tipRepository.save(existingTip);
    }

    // If the tip does not have an ID, we are creating a new tip
    delete tipDto.id;
    return this.tipRepository.save(
      this.tipRepository.create(tipDto),
    );
  }

  private async handleFillBlank(dto: CreateFillBlankDto) {
    // Delete
    if (dto.delete) {
      await this.fillBlankRowRepository.delete({ exercise: { id: dto.id } });
      await this.fillBlankRepository.delete({ id: dto.id });
      return null;
    }

    // Update
    if (dto.id > 0) {
      const existing = await this.fillBlankRepository.findOneBy({ id: dto.id });
      if (!existing) return null;
      existing.style = dto.style;
      existing.order = dto.order;
      existing.gridId = dto.gridId ?? null;
      existing.gridCols = dto.gridCols ?? 1;
      const updated = await this.fillBlankRepository.save(existing);

      await this.fillBlankRowRepository.delete({ exercise: { id: existing.id } });
      for (const rowDto of dto.rows) {
        const row = this.fillBlankRowRepository.create({ ...rowDto, exercise: updated });
        await this.fillBlankRowRepository.save(row);
      }

      return updated;
    }

    // Create
    const exerciseDto = { ...dto } as any;
    delete exerciseDto.id;
    delete exerciseDto.rows;

    const exercise = await this.fillBlankRepository.save(
      this.fillBlankRepository.create(exerciseDto),
    ) as unknown as FillBlankExercise;

    for (const rowDto of dto.rows) {
      const row = this.fillBlankRowRepository.create({ ...rowDto, exercise });
      await this.fillBlankRowRepository.save(row);
    }

    return exercise;
  }
}
