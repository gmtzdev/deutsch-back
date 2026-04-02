import { Test, TestingModule } from '@nestjs/testing';
import { SubtopicsService } from './subtopics.service';

describe('SubtopicsService', () => {
  let service: SubtopicsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubtopicsService],
    }).compile();

    service = module.get<SubtopicsService>(SubtopicsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
