import { Test, TestingModule } from '@nestjs/testing';
import { getMetadataArgsStorage } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { GroupsService } from './groups.service';
import { Group } from './entities/group.entity';
import { User } from '../auth/entities/user.entity';
import { Level } from '../levels/entities/level.entity';

describe('GroupsService', () => {
  let service: GroupsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        GroupsService,
        {
          provide: getRepositoryToken(Group),
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Level),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<GroupsService>(GroupsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should declare a many-to-many relation between groups and users', () => {
    const groupRelation = getMetadataArgsStorage().relations.find(
      (relation) => relation.target === Group && relation.propertyName === 'users',
    );
    const userRelation = getMetadataArgsStorage().relations.find(
      (relation) => relation.target === User && relation.propertyName === 'groups',
    );
    const groupLevelsRelation = getMetadataArgsStorage().relations.find(
      (relation) => relation.target === Group && relation.propertyName === 'levels',
    );
    const levelRelation = getMetadataArgsStorage().relations.find(
      (relation) => relation.target === Level && relation.propertyName === 'groups',
    );

    expect(groupRelation).toBeDefined();
    expect(groupRelation?.relationType).toBe('many-to-many');
    expect(userRelation).toBeDefined();
    expect(userRelation?.relationType).toBe('many-to-many');
    expect(groupLevelsRelation).toBeDefined();
    expect(groupLevelsRelation?.relationType).toBe('many-to-many');
    expect(levelRelation).toBeDefined();
    expect(levelRelation?.relationType).toBe('many-to-many');
  });
});
