import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'

import { CreateLeatherFactoryDto } from './dto/create-leather-factory.dto'
import { UpdateLeatherFactoryDto } from './dto/update-leather-factory.dto'
import { LeatherFactoryEntity } from './entities/leather-factory.entity'
import { LeatherFactoriesService } from './leather-factories.service'

@ApiTags('Leather-factories')
@Controller('leather-factories')
export class LeatherFactoriesController {
  constructor(private readonly leatherFactoriesService: LeatherFactoriesService) {}

  @Post()
  async create(@Body() createFactoryDto: CreateLeatherFactoryDto): Promise<LeatherFactoryEntity> {
    return this.leatherFactoriesService.create(createFactoryDto)
  }

  @Get()
  async findAll(): Promise<LeatherFactoryEntity[]> {
    return this.leatherFactoriesService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LeatherFactoryEntity> {
    return this.leatherFactoriesService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFactoryDto: UpdateLeatherFactoryDto
  ): Promise<LeatherFactoryEntity> {
    return this.leatherFactoriesService.update(id, updateFactoryDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<LeatherFactoryEntity> {
    return this.leatherFactoriesService.remove(id)
  }
}
