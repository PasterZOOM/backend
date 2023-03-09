import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { FilterQuery } from 'mongoose'
import { BasicProductEntity } from 'src/modules/basic-products/entities/basic-product.entity'
import { EFilterKeys } from 'src/modules/basic-products/entities/basic-product.type'
import { BasicProductDocument } from 'src/modules/basic-products/schemas/basic-product.schema'
import { LeatherColorsService } from 'src/modules/materials/leathers/modules/leather-colors/leather-colors.service'

import { BasicProductsService } from './basic-products.service'
import { CreateBasicProductDto } from './dto/create-basic-product.dto'
import { UpdateBasicProductDto } from './dto/update-basic-product.dto'

@ApiTags('Basic-products')
@Controller('basic-products')
export class BasicProductsController {
  constructor(
    private readonly basicProductsService: BasicProductsService,
    private readonly leatherColorsService: LeatherColorsService
  ) {}

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
    const filters = async (): Promise<FilterQuery<BasicProductDocument>> => {
      const filters: Partial<Record<EFilterKeys, string[] | undefined>> = {}

      Object.entries({
        [EFilterKeys.ASSIGNMENTS]: assignments,
        [EFilterKeys.CATEGORIES]: categories,
        [EFilterKeys.LEATHER_COLORS]: leatherColors
          ? await Promise.all(
              leatherColors.map(async value => {
                const colors = await this.leatherColorsService.findAll({ value })

                return colors.map(color => color.article).join(',')
              })
            )
          : undefined,
        [EFilterKeys.LEATHERS]: leathers,
      }).forEach(([key, value]) => {
        if (value) {
          if (key === 'leatherColors') {
            filters[key] = value.join(',').split(',')
          } else {
            filters[key] = value
          }
        }
      })
      let categoriesArray = []
      let leathersArray = []
      let assignmentsArray = []
      let colorsArray = []

      if (filters.categories) {
        categoriesArray = filters.categories.map(category => ({ category }))
      }
      if (filters.leathers) {
        leathersArray = filters.leathers.map(leather => ({ leather }))
      }
      if (filters.assignments) {
        assignmentsArray = filters.assignments.map(assignments => ({ assignments }))
      }
      if (filters.leatherColors) {
        colorsArray = filters.leatherColors.map(color => ({ [color]: true }))
      }

      return {
        $and: [
          categoriesArray.length ? { $or: categoriesArray } : {},
          leathersArray.length ? { $or: leathersArray } : {},
          assignmentsArray.length ? { $or: assignmentsArray } : {},
          colorsArray.length ? { $or: colorsArray } : {},
        ],
      }
    }

    return this.basicProductsService.findAll(await filters())
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
