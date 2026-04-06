import { Injectable } from '@nestjs/common';
import { CreateTopicDto } from './dto/create-topic.dto';
import { UpdateTopicDto } from './dto/update-topic.dto';
import { Topic } from './entities/topic.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TopicsService {
  constructor(
    @InjectRepository(Topic)
    private readonly topicRepository: Repository<Topic>,
  ) { }

  create(createTopicDto: CreateTopicDto) {
    return this.topicRepository.save(
      this.topicRepository.create(createTopicDto),
    );
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
