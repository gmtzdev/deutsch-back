import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';
import { Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { LevelsService } from 'src/levels/levels.service';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
    private readonly levelsService: LevelsService,
  ) { }

  public async create(createTopicDto: CreateTopicDto) {
    const topic = await this.topicRepository.save(this.topicRepository.create(createTopicDto));
    this.levelsService.recalculateLessonNumbers();
    return topic;
  }

  findAll() {
    return this.topicRepository.find();
  }

  findOne(id: number) {
    return this.topicRepository.findOneBy({ id });

  }

  async update(id: number, updateTopicDto: UpdateTopicDto) {
    const result: UpdateResult = await this.topicRepository.update(id, updateTopicDto);
    if (result.affected === 0) {
      throw new Error(`Topic with id ${id} not found`);
    }
    return this.topicRepository.findOneBy({ id });
  }

  remove(id: number) {
    return `This action removes a #${id} topic`;
  }
}
