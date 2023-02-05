import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'

import { CreateThreadDto } from './dto/create-thread.dto'
import { UpdateThreadDto } from './dto/update-thread.dto'
import { IThread } from './interfaces/thread.interface'
import { ThreadsService } from './threads.service'

@Controller('threads')
export class ThreadsController {
  constructor(private readonly threadService: ThreadsService) {}

  @Post()
  create(@Body() createThreadDto: CreateThreadDto): Promise<IThread> {
    return this.threadService.create(createThreadDto)
  }

  @Get()
  findAll(): Promise<IThread[]> {
    return this.threadService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IThread> {
    return this.threadService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateThreadDto: UpdateThreadDto): Promise<IThread> {
    return this.threadService.update(id, updateThreadDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IThread> {
    return this.threadService.remove(id)
  }
}
