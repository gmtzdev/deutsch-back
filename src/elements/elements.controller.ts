import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { ElementsService } from './elements.service';
import { CreateElementDto } from './dto/create-element.dto';
import { UpdateElementDto } from './dto/update-element.dto';
import { CreateBodyLessonDto } from './dto/create-body-lesson.dto';

@ApiTags('elements')
@Controller('elements')
export class ElementsController {
  constructor(private readonly elementsService: ElementsService) { }

  @Post()
  create(@Body() createElementDto: CreateElementDto) {
    return this.elementsService.create(createElementDto);
  }

  @Post('create-lesson')
  @ApiBody({
    type: CreateBodyLessonDto,
    examples: {
      allTypes: {
        summary: 'Lesson with title, subtitle and element',
        value: {
          lesson: {
            id: 2,
            title: 'Lektion 1',
          },
          elements: [
            { type: 'title', text: 'Lektion 1', style: 'normal', baseStyle: 'h1' },
            { type: 'subtitle', text: 'Einführung', style: 'normal', baseStyle: 'h2' },
            { type: 'element', text: 'Das ist ein Haus.', style: 'normal' },
            {
              type: 'unorderedList', text: '', style: 'normal', baseStyle: 'ul', list: [
                { type: 'listItem', text: 'List item 1', style: 'normal', baseStyle: 'li' },
                { type: 'listItem', text: 'List item 2', style: 'normal', baseStyle: 'li' },
              ]
            },
          ],
        },
      },
    },
  })
  createLesson(@Body() createBodyLessonDto: CreateBodyLessonDto) {
    return this.elementsService.createLesson(createBodyLessonDto);
  }

  @Get()
  findAll() {
    return this.elementsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.elementsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateElementDto: UpdateElementDto) {
    return this.elementsService.update(+id, updateElementDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.elementsService.remove(+id);
  }
}
