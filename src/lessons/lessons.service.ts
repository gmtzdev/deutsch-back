import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class LessonsService {

  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
  ) { }

  create(createLessonDto: CreateLessonDto) {
    return this.lessonRepository.save(
      this.lessonRepository.create(createLessonDto),
    );
  }

  findAll() {
    return this.lessonRepository.find();
  }

  findOne(id: number) {
    return this.lessonRepository.findOneBy({ id });
  }

  update(id: number, updateLessonDto: UpdateLessonDto) {
    return `This action updates a #${id} lesson`;
  }

  remove(id: number) {
    return `This action removes a #${id} lesson`;
  }
}
