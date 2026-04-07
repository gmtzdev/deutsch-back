import { CreateElementDto } from "../dto/create-element.dto";
import { CreateListItemDto } from "../dto/listitem/create-title.dto";
import { CreateSubtitleDto } from "../dto/subtitle/create-title.dto";
import { CreateTableDto } from "../dto/table/create-table.dto";
import { CreateTitleDto } from "../dto/title/create-title.dto";
import { CreateUnorderedListDto } from "../dto/unorderedlist/create-title.dto";
import { CreateConjugationDto } from "../dto/conjugation/create-conjugation.dto";
import { CreateQuizDto } from "../dto/quiz/create-quiz.dto";
import { CreateImageBlockDto } from "../dto/image-block/create-image-block.dto";
import { Element } from "../entities/element.entity";
import { ListItem } from "../entities/listitem.entity";
import { Subtitle } from "../entities/subtitle.entity";
import { Table } from "../entities/table.entity";
import { Tag } from "../entities/tag.entity";
import { Tip } from "../entities/tip.entity";
import { Title } from "../entities/title.entity";
import { UnorderedList } from "../entities/unorderedlist";
import { Conjugation } from "../entities/conjugation.entity";
import { Quiz } from "../entities/quiz.entity";
import { ImageBlock } from "../entities/image-bock.entity";


export type LessonElementDto = CreateElementDto | CreateTitleDto | CreateSubtitleDto | CreateListItemDto | CreateUnorderedListDto | CreateTableDto | CreateConjugationDto | CreateQuizDto | CreateImageBlockDto;
export type ElementType = 'element' | 'title' | 'subtitle' | 'listItem' | 'unorderedList' | 'table' | 'tip' | 'tag' | 'conjugation' | 'quiz' | 'imageBlock';
export type ElementTypeObj = Element | Title | Subtitle | ListItem | UnorderedList | Table | Tip | Tag | Conjugation | Quiz | ImageBlock;
export const elementTypes: ElementType[] = ['element', 'title', 'subtitle', 'listItem', 'unorderedList', 'table', 'tip', 'tag', 'conjugation', 'quiz', 'imageBlock'];