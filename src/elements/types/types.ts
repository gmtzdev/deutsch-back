import { CreateElementDto } from "../dto/create-element.dto";
import { CreateListItemDto } from "../dto/listitem/create-title.dto";
import { CreateSubtitleDto } from "../dto/subtitle/create-title.dto";
import { CreateTitleDto } from "../dto/title/create-title.dto";
import { CreateUnorderedListDto } from "../dto/unorderedlist/create-title.dto";
import { Element } from "../entities/element.entity";
import { ListItem } from "../entities/listitem.entity";
import { Subtitle } from "../entities/subtitle.entity";
import { Title } from "../entities/title.entity";
import { UnorderedList } from "../entities/unorderedlist";

export type LessonElementDto = CreateElementDto | CreateTitleDto | CreateSubtitleDto | CreateListItemDto | CreateUnorderedListDto;



export type ElementType = 'element' | 'title' | 'subtitle' | 'listItem' | 'unorderedList';

export type ElementTypeObj = Element | Title | Subtitle | ListItem | UnorderedList;
export const elementTypes: ElementType[] = ['element', 'title', 'subtitle', 'listItem', 'unorderedList'];