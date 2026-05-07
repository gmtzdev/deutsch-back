import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';
import { Repository } from 'typeorm';
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

  update(id: number, updateTopicDto: UpdateTopicDto) {
    return `This action updates a #${id} topic`;
  }

  remove(id: number) {
    return `This action removes a #${id} topic`;
  }
}
