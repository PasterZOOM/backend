import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { BasicProductEntity } from 'src/modules/basic-products/entities/basic-product.entity'
import { EFilterKeys } from 'src/modules/basic-products/entities/basic-product.type'

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
  @ApiQuery({ name: EFilterKeys.ASSIGNMENTS, required: false })
  @ApiQuery({ name: EFilterKeys.CATEGORIES, required: false })
  @ApiQuery({ name: EFilterKeys.LEATHER_COLORS, required: false })
  @ApiQuery({ name: EFilterKeys.LEATHERS, required: false })
  async findAll(
    @Query(EFilterKeys.ASSIGNMENTS) assignments?: string[],
    @Query(EFilterKeys.CATEGORIES) categories?: string[],
    @Query(EFilterKeys.LEATHER_COLORS) leatherColors?: string[],
    @Query(EFilterKeys.LEATHERS) leathers?: string[]
  ): Promise<BasicProductEntity[]> {
    const filters = (): Partial<Record<EFilterKeys, string[] | undefined>> => {
      const filters: Partial<Record<EFilterKeys, string[] | undefined>> = {}

      Object.entries({
        [EFilterKeys.ASSIGNMENTS]: assignments,
        [EFilterKeys.CATEGORIES]: categories,
        [EFilterKeys.LEATHER_COLORS]: leatherColors,
        [EFilterKeys.LEATHERS]: leathers,
      }).forEach(([key, value]) => {
        if (value) {
          filters[key] = value
        }
      })

      return filters
    }

    return this.basicProductsService.findAll(filters())
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
