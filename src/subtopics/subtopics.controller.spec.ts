import { Test, TestingModule } from '@nestjs/testing';
import { SubtopicsController } from './subtopics.controller';
import { SubtopicsService } from './subtopics.service';

describe('SubtopicsController', () => {
  let controller: SubtopicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubtopicsController],
      providers: [SubtopicsService],
    }).compile();

    controller = module.get<SubtopicsController>(SubtopicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
