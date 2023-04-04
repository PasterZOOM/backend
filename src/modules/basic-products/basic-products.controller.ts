import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { FilterQuery } from 'mongoose'

import { LeatherArticleEntity } from '../materials/leathers/modules/leather-articles/entities/leather-article.entity'
import { LeatherArticlesService } from '../materials/leathers/modules/leather-articles/leather-articles.service'
import { LeatherColorsService } from '../materials/leathers/modules/leather-colors/leather-colors.service'

import { BasicProductsService } from './basic-products.service'
import { CreateBasicProductDto } from './dto/create-basic-product.dto'
import { UpdateBasicProductDto } from './dto/update-basic-product.dto'
import { BasicProductEntity } from './entities/basic-product.entity'
import { EFilterKeys } from './entities/basic-product.type'
import { BasicProductDocument } from './schemas/basic-product.schema'

@ApiTags('Basic-products')
@Controller('basic-products')
export class BasicProductsController {
  constructor(
    private readonly basicProductsService: BasicProductsService,
    private readonly leatherColorsService: LeatherColorsService,
    private readonly leatherArticlesService: LeatherArticlesService
  ) {}

  @Post()
  async create(@Body() createBasicProductDto: CreateBasicProductDto): Promise<BasicProductEntity> {
    return this.basicProductsService.create(createBasicProductDto)
  }

  @Get() // TODO написать возвращаемый тип для swagger
  @ApiQuery({ name: EFilterKeys.ASSIGNMENTS, required: false })
  @ApiQuery({ name: EFilterKeys.CATEGORIES, required: false })
  @ApiQuery({ name: EFilterKeys.LEATHER_COLORS, required: false })
  @ApiQuery({ name: EFilterKeys.LEATHERS, required: false })
  async findAll(
    @Query(EFilterKeys.ASSIGNMENTS) assignments?: string[],
    @Query(EFilterKeys.CATEGORIES) categories?: string[],
    @Query(EFilterKeys.LEATHER_COLORS) leatherColors?: string[],
    @Query(EFilterKeys.LEATHERS) leathers?: string[]
  ): Promise<
    Awaited<
      Omit<BasicProductEntity, 'leather'> & { leather: Pick<LeatherArticleEntity, '_id' | 'title'> }
    >[]
  > {
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
        leathersArray = await Promise.all(
          filters.leathers.map(async leather => {
            const { _id } = await this.leatherArticlesService.find({ title: leather })

            return { leather: _id }
          })
        )
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
          assignmentsArray.length ? { $and: assignmentsArray } : {}, // TODO: проработать этот момент с UX, and или or
          colorsArray.length ? { $or: colorsArray } : {},
        ],
      }
    }

    const basicProducts = await this.basicProductsService.findAll(await filters())

    return Promise.all(
      basicProducts.map(
        async ({
          category,
          description,
          costCurrency,
          cost,
          leather,
          assignments,
          punchPitch,
          photos,
          _id,
          size,
          title,
        }) => {
          const { title: leatherTitle } = await this.leatherArticlesService.findOne(leather)

          return {
            assignments,
            title,
            _id,
            size,
            punchPitch,
            photos,
            costCurrency,
            description,
            category,
            cost,
            leather: { _id: leather, title: leatherTitle },
          }
        }
      )
    )
  }

  @Get(':id') // TODO написать возвращаемый тип для swagger
  async findOne(
    @Param('id') id: string
  ): Promise<
    Omit<BasicProductEntity, 'leather'> & { leather: Pick<LeatherArticleEntity, '_id' | 'title'> }
  > {
    const {
      assignments,
      leather,
      description,
      category,
      cost,
      costCurrency,
      photos,
      punchPitch,
      size,
      _id,
      title,
    } = await this.basicProductsService.findOne(id)

    const { title: leatherTitle } = await this.leatherArticlesService.findOne(leather)

    return {
      assignments,
      title,
      _id,
      size,
      punchPitch,
      photos,
      costCurrency,
      description,
      category,
      cost,
      leather: { _id: leather, title: leatherTitle },
    }
  }

  @Patch(':id') // TODO написать возвращаемый тип для swagger
  async update(
    @Param('id') id: string,
    @Body() updateBasicProductDto: UpdateBasicProductDto
  ): Promise<
    Omit<BasicProductEntity, 'leather'> & { leather: Pick<LeatherArticleEntity, '_id' | 'title'> }
  > {
    const {
      _id,
      description,
      title,
      photos,
      punchPitch,
      size,
      leather,
      assignments,
      costCurrency,
      cost,
      category,
    } = await this.basicProductsService.update(id, updateBasicProductDto)

    const { title: leatherTitle } = await this.leatherArticlesService.findOne(leather)

    return {
      assignments,
      title,
      _id,
      size,
      punchPitch,
      photos,
      costCurrency,
      description,
      category,
      cost,
      leather: { _id: leather, title: leatherTitle },
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<BasicProductEntity> {
    return this.basicProductsService.remove(id)
  }
}
