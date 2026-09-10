import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) { }

  @Post()
  create(@Body() createGroupDto: CreateGroupDto) {
    return this.groupsService.create(createGroupDto);
  }

  @Get()
  findAll() {
    return this.groupsService.findAll();
  }

  @Get('count')
  count() {
    return this.groupsService.count();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.groupsService.findOne(+id);
  }

  @Get(':id/users')
  findUsers(@Param('id') id: string) {
    return this.groupsService.findUsers(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGroupDto: UpdateGroupDto) {
    return this.groupsService.update(+id, updateGroupDto);
  }

  @Patch(':id/add-users')
  addUsers(@Param('id') id: string, @Body() body: any) {
    console.log('Adding users:', body);
    return this.groupsService.addUsers(+id, body.users);
  }

  @Delete(':id/remove-user/:userId')
  removeUser(@Param('id') id: string, @Param('userId') userId: string) {
    console.log('Removing user:', userId);
    return this.groupsService.removeUser(+id, +userId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.groupsService.remove(+id);
  }

  // @Post(':id/users')
  // addUsers(@Param('id') id: string, @Body('userIds') userIds: number[]) {
  //   return this.groupsService.addUsers(+id, userIds);
  // }

  // @Delete(':id/users/:userId')
  // removeUser(@Param('id') id: string, @Param('userId') userId: string) {
  //   return this.groupsService.removeUser(+id, +userId);
  // }

  @Post(':id/levels')
  addLevels(@Param('id') id: string, @Body('levelIds') levelIds: number[]) {
    return this.groupsService.addLevels(+id, levelIds);
  }

  @Delete(':id/levels/:levelId')
  removeLevel(@Param('id') id: string, @Param('levelId') levelId: string) {
    return this.groupsService.removeLevel(+id, +levelId);
  }
}
