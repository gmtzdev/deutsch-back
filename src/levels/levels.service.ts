import { Injectable } from '@nestjs/common';
import { CreateLevelDto } from './dto/create-level.dto';
import { UpdateLevelDto } from './dto/update-level.dto';
import { Repository } from 'typeorm';
import { Level } from './entities/level.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class LevelsService {
  constructor(
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
    private readonly userService: AuthService
  ) { }

  create(createLevelDto: CreateLevelDto) {
    return this.levelRepository.save(
      this.levelRepository.create(createLevelDto),
    );
  }

  findAll() {
    return this.levelRepository.find({ relations: ['topics'] });
  }

  async findVisibles(userId?: string) {
    // return this.levelRepository.find({ where: { visible: true }, relations: ['topics'] });
    if (!userId) {
      return this.levelRepository.find({
        where: { visible: true },
        relations: ['topics'],
      });
    }

    const user = await this.userService.getUserById(+userId);
    if (user && user.role === 'admin') {
      return this.levelRepository.find({ where: { visible: true }, relations: ['topics'] });
    }

    return this.levelRepository
      .createQueryBuilder('level')
      .leftJoinAndSelect('level.topics', 'topic')
      .leftJoin('level.groups', 'group')
      .leftJoin('group.users', 'user')
      .where('level.visible = :visible', { visible: true })
      .andWhere('user.id = :userId', { userId })
      .orderBy('level.id', 'ASC')
      .getMany();
  }

  findAllWithoutTopics() {
    return this.levelRepository.find();
  }

  async findOne(id: number) {
    let level;
    level = await this.levelRepository.createQueryBuilder('level')
      .leftJoinAndSelect('level.topics', 'topic')
      .leftJoinAndSelect('topic.subtopics', 'subtopic')
      .where('level.id = :id', { id })
      .andWhere('topic.visible = true')
      .andWhere('(subtopic.visible = true OR subtopic.id IS NULL)')
      .orderBy('topic.id', 'ASC')
      .addOrderBy('subtopic.order', 'ASC')
      .getOne();

    if (!level) {
      level = await this.levelRepository.findOne({ where: { id } });
      if (level) {
        level = await this.levelRepository.findOne({ where: { id }, relations: ['topics'] });
      }
    }
    return level;
  }

  findOneAll(id: number) {
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