import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { User } from '../auth/entities/user.entity';
import { Level } from '../levels/entities/level.entity';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupsService {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Level)
    private readonly levelRepository: Repository<Level>,
  ) { }

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    const { userIds = [], levelIds = [], ...groupData } = createGroupDto;

    const group = this.groupRepository.create({
      ...groupData,
      users: userIds.length ? await this.userRepository.findByIds(userIds) : [],
      levels: levelIds.length ? await this.levelRepository.findByIds(levelIds) : [],
    });

    return this.groupRepository.save(group);
  }

  findAll(): Promise<Group[]> {
    return this.groupRepository.find({ relations: ['users', 'levels'] });
  }

  async findOne(id: number): Promise<Group> {
    const group = await this.groupRepository.findOne({
      where: { id },
      relations: ['users', 'levels'],
    });

    if (!group) {
      throw new NotFoundException(`Grupo con id ${id} no encontrado`);
    }

    return group;
  }

  async findUsers(id: number): Promise<User[]> {
    const group = await this.findOne(id);
    return group.users || [];
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
    const group = await this.findOne(id);

    if (updateGroupDto.name !== undefined) {
      group.name = updateGroupDto.name;
    }

    if (updateGroupDto.userIds) {
      group.users = await this.userRepository.findByIds(updateGroupDto.userIds);
    }

    if (updateGroupDto.levelIds) {
      group.levels = await this.levelRepository.findByIds(updateGroupDto.levelIds);
    }

    await this.groupRepository.save(group);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const group = await this.findOne(id);
    await this.groupRepository.remove(group);
  }

  async addUsers(id: number, userIds: number[]): Promise<Group> {
    const group = await this.findOne(id);
    const users = await this.userRepository.findByIds(userIds);
    group.users = [...(group.users || []), ...users.filter((user) => !group.users.some((gUser) => gUser.id === user.id))];
    await this.groupRepository.save(group);
    return this.findOne(id);
  }

  async removeUser(id: number, userId: number): Promise<Group> {
    const group = await this.findOne(id);
    group.users = (group.users || []).filter((user) => user.id !== userId);
    await this.groupRepository.save(group);
    return this.findOne(id);
  }

  async addLevels(id: number, levelIds: number[]): Promise<Group> {
    const group = await this.findOne(id);
    const levels = await this.levelRepository.findByIds(levelIds);
    group.levels = [...(group.levels || []), ...levels.filter((level) => !group.levels.some((groupLevel) => groupLevel.id === level.id))];
    await this.groupRepository.save(group);
    return this.findOne(id);
  }

  async removeLevel(id: number, levelId: number): Promise<Group> {
    const group = await this.findOne(id);
    group.levels = (group.levels || []).filter((level) => level.id !== levelId);
    await this.groupRepository.save(group);
    return this.findOne(id);
  }

  async count(): Promise<number> {
    return this.groupRepository.count({ where: { visible: true } });
  }
}
