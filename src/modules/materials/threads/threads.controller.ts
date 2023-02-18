import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CreateThreadDto } from './dto/create-thread.dto'
import { UpdateThreadDto } from './dto/update-thread.dto'
import { ThreadEntity } from './entities/thread.entity'
import { ThreadsService } from './threads.service'

@ApiTags('Threads')
@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadService: ThreadsService) {}

  @Post()
  create(@Body() createThreadDto: CreateThreadDto): Promise<ThreadEntity> {
    return this.threadService.create(createThreadDto)
  }

  @Get()
  findAll(): Promise<ThreadEntity[]> {
    return this.threadService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ThreadEntity> {
    return this.threadService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateThreadDto: UpdateThreadDto
  ): Promise<ThreadEntity> {
    await this.threadService.update(id, updateThreadDto)

    return this.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ThreadEntity> {
    return this.threadService.remove(id)
  }
}
