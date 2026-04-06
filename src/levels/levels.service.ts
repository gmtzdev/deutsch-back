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

  findAllWithoutTopics() {
    return this.levelRepository.find();
  }

  findOne(id: number) {
    return this.levelRepository.findOne({ where: { id }, relations: ['topics', 'topics.subtopics'] });
  }

  update(id: number, updateLevelDto: UpdateLevelDto) {
    return `This action updates a #${id} level`;
  }

  remove(id: number) {
    return `This action removes a #${id} level`;
  }
}
