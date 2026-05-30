import { Injectable } from '@nestjs/common';
import { CreateSubtopicDto } from './dto/create-subtopic.dto';
import { UpdateSubtopicDto } from './dto/update-subtopic.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subtopic } from './entities/subtopic.entity';
import { elementTypes } from 'src/elements/types/types';
import { ElementsService } from 'src/elements/elements.service';
import { LessonsService } from 'src/lessons/lessons.service';
import { ReorderSubtopicDto } from './dto/reorder-subtopic.dto';

@Injectable()
export class SubtopicsService {
  constructor(
    @InjectRepository(Subtopic)
    private readonly subtopicRepository: Repository<Subtopic>,
    private readonly elementsService: ElementsService,
    private readonly lessonService: LessonsService,
  ) { }


  async create(createSubtopicDto: CreateSubtopicDto) {
    const subtopic = await this.subtopicRepository.save(this.subtopicRepository.create(createSubtopicDto));
    this.lessonService.create({
      type: '00000',
      subtopic: subtopic,
    })
    return subtopic;
  }

  findAll() {
    return this.subtopicRepository.find();
  }

  async findOne(id: number) {
    const subtopic = await this.subtopicRepository.findOne({ where: { id }, relations: ['lesson'] });

    let elements = [];
    if (subtopic.lesson) {
      for (const type of elementTypes) {
        const el = await this.elementsService.getElementsByLessonId(subtopic.lesson.id, type);
        if (el != null)
          elements = elements.concat(el);
      }
    }
    subtopic.lesson.elements = elements.sort((a, b) => a.order - b.order);
    return subtopic;
  }

  update(id: number, updateSubtopicDto: UpdateSubtopicDto) {
    const subtopic = this.subtopicRepository.create({ id, ...updateSubtopicDto });
    return this.subtopicRepository.save(subtopic);
  }

  async reorder(subtopics: ReorderSubtopicDto[]) {
    for (const subtopicDto of subtopics) {
      const subtopic = await this.subtopicRepository.findOneBy({ id: subtopicDto.id });
      if (subtopic) {
        subtopic.order = subtopicDto.order;
        subtopic.topic = { id: subtopicDto.topicId } as any; // Only set the ID to avoid fetching the entire topic
        await this.subtopicRepository.save(subtopic);
      }
    }
    return { message: 'Subtopics reordered successfully' };
  }

  remove(id: number) {
    return this.subtopicRepository.delete(id);
  }
}
