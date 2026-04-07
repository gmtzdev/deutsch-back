import { CreateElementDto } from "../dto/create-element.dto";
import { CreateListItemDto } from "../dto/listitem/create-title.dto";
import { CreateSubtitleDto } from "../dto/subtitle/create-title.dto";
import { CreateTableDto } from "../dto/table/create-table.dto";
import { CreateTitleDto } from "../dto/title/create-title.dto";
import { CreateUnorderedListDto } from "../dto/unorderedlist/create-title.dto";
import { Element } from "../entities/element.entity";
import { ListItem } from "../entities/listitem.entity";
import { Subtitle } from "../entities/subtitle.entity";
import { Table } from "../entities/table.entity";
import { Tag } from "../entities/tag.entity";
import { Tip } from "../entities/tip.entity";
import { Title } from "../entities/title.entity";
import { UnorderedList } from "../entities/unorderedlist";


export type LessonElementDto = CreateElementDto | CreateTitleDto | CreateSubtitleDto | CreateListItemDto | CreateUnorderedListDto | CreateTableDto;
export type ElementType = 'element' | 'title' | 'subtitle' | 'listItem' | 'unorderedList' | 'table' | 'tip' | 'tag';
export type ElementTypeObj = Element | Title | Subtitle | ListItem | UnorderedList | Table | Tip | Tag;
export const elementTypes: ElementType[] = ['element', 'title', 'subtitle', 'listItem', 'unorderedList', 'table', 'tip', 'tag'];