import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'

import { CreateLeatherFactoryDto } from './dto/create-leather-factory.dto'
import { UpdateLeatherFactoryDto } from './dto/update-leather-factory.dto'
import { ILeatherFactory } from './interfaces/leather-factory.interface'
import { LeatherFactoriesService } from './leather-factories.service'

@Controller('leather-factories')
export class LeatherFactoriesController {
  constructor(private readonly leatherFactoriesService: LeatherFactoriesService) {}

  @Post()
  async create(@Body() createFactoryDto: CreateLeatherFactoryDto): Promise<ILeatherFactory> {
    return this.leatherFactoriesService.create(createFactoryDto)
  }

  @Get()
  async findAll(): Promise<ILeatherFactory[]> {
    return this.leatherFactoriesService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ILeatherFactory> {
    return this.leatherFactoriesService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFactoryDto: UpdateLeatherFactoryDto
  ): Promise<ILeatherFactory> {
    return this.leatherFactoriesService.update(id, updateFactoryDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ILeatherFactory> {
    return this.leatherFactoriesService.remove(id)
  }
}
