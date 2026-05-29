import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { SubtopicsService } from './subtopics.service';
import { CreateSubtopicDto } from './dto/create-subtopic.dto';
import { UpdateSubtopicDto } from './dto/update-subtopic.dto';
import { ReorderSubtopicDto } from './dto/reorder-subtopic.dto';

@Controller('subtopics')
export class SubtopicsController {
  constructor(private readonly subtopicsService: SubtopicsService) { }

  @Post()
  create(@Body() createSubtopicDto: CreateSubtopicDto) {
    return this.subtopicsService.create(createSubtopicDto);
  }

  @Get()
  findAll() {
    return this.subtopicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.subtopicsService.findOne(+id);
  }

  @Patch('reorder')
  reorder(@Body() subtopics: ReorderSubtopicDto[]) {
    return this.subtopicsService.reorder(subtopics);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSubtopicDto: UpdateSubtopicDto) {
    return this.subtopicsService.update(+id, updateSubtopicDto);
  }



  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.subtopicsService.remove(+id);
  }
}
