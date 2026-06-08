import { Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { Repository } from 'typeorm';
import { Level } from './entities/level.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) { }

  create(createLevelDto: CreateLevelDto) {
    return this.levelRepository.save(
      this.levelRepository.create(createLevelDto),
    );
  }

  findAll() {
    return this.levelRepository.find({ relations: ['topics'] });
  }

  findVisibles() {
    return this.levelRepository.find({ where: { visible: true }, relations: ['topics'] });
  }

  findAllWithoutTopics() {
    return this.levelRepository.find();
  }

  findOne(id: number) {
    return this.levelRepository.createQueryBuilder('level')
      .leftJoinAndSelect('level.topics', 'topic')
      .leftJoinAndSelect('topic.subtopics', 'subtopic')
      .where('level.id = :id', { id })
      .orderBy('topic.id', 'ASC')
      .addOrderBy('subtopic.order', 'ASC')
      .getOne();
  }

  update(id: number, updateLevelDto: UpdateLevelDto) {
    return `This action updates a #${id} level`;
  }

  remove(id: number) {
    return `This action removes a #${id} level`;
  }


  public recalculateLessonNumbers() {
    this.levelRepository.find({ relations: ['topics', 'topics.subtopics'] }).then(levels => {
      levels.forEach(level => {
        let lessonNumber = 0;
        level.topics.forEach(topic => {
          lessonNumber++;
        });
        level.lessonNumber = lessonNumber;
        this.levelRepository.save(level);
      });
    });
  }
}