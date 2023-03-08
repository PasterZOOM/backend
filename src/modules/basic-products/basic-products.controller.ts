import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { BasicProductEntity } from 'src/modules/basic-products/entities/basic-product.entity'

import { BasicProductsService } from './basic-products.service'
import { CreateBasicProductDto } from './dto/create-basic-product.dto'
import { UpdateBasicProductDto } from './dto/update-basic-product.dto'

@ApiTags('Basic-products')
@Controller('basic-products')
export class BasicProductsController {
  constructor(private readonly basicProductsService: BasicProductsService) {}

  @Post()
  async create(@Body() createBasicProductDto: CreateBasicProductDto): Promise<BasicProductEntity> {
    return this.basicProductsService.create(createBasicProductDto)
  }

  @Get()
  async findAll(): Promise<BasicProductEntity[]> {
    return this.basicProductsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BasicProductEntity> {
    return this.basicProductsService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBasicProductDto: UpdateBasicProductDto
  ): Promise<BasicProductEntity> {
    return this.basicProductsService.update(id, updateBasicProductDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<BasicProductEntity> {
    return this.basicProductsService.remove(id)
  }
}
