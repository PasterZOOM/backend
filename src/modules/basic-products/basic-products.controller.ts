import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { FilterQuery, Types } from 'mongoose'
import { v1 } from 'uuid'

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
          isPublished,
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
            isPublished,
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
    @Param('id') id: Types.ObjectId
  ): Promise<
    Omit<BasicProductEntity, 'leather'> & { leather: Pick<LeatherArticleEntity, '_id' | 'title'> }
  > {
    const {
      assignments,
      leather,
      isPublished,
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
      isPublished,
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
    @Param('id') id: Types.ObjectId,
    @Body() updateBasicProductDto: UpdateBasicProductDto
  ): Promise<
    Omit<BasicProductEntity, 'leather'> & { leather: Pick<LeatherArticleEntity, '_id' | 'title'> }
  > {
    const {
      _id,
      isPublished,
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
      isPublished,
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
  async remove(@Param('id') id: Types.ObjectId): Promise<BasicProductEntity> {
    return this.basicProductsService.remove(id)
  }

  @Put(':id/photo')
  async addPhoto(
    @Param('id') id: Types.ObjectId,
    @Body() photo: { [key: string]: string[] }
  ): Promise<
    Omit<BasicProductEntity, 'leather'> & { leather: Pick<LeatherArticleEntity, '_id' | 'title'> }
  > {
    const product = await this.basicProductsService.findOne(id)

    Object.keys(photo).forEach(key => {
      const photos = photo[key].map(url => ({ _id: v1(), url }))

      if (product.photos[key]) {
        product.photos[key] = [...product.photos[key], ...photos]
      } else {
        product.photos[key] = photos
      }
    })

    const {
      _id,
      isPublished,
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
    } = await this.basicProductsService.update(id, { photos: product.photos })

    const { title: leatherTitle } = await this.leatherArticlesService.findOne(leather)

    return {
      assignments,
      isPublished,
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

  @Delete(':productId/photo/:photoId')
  async removePhoto(
    @Param('productId') productId: Types.ObjectId,
    @Param('photoId') photoId: Types.ObjectId
  ): Promise<
    Omit<BasicProductEntity, 'leather'> & { leather: Pick<LeatherArticleEntity, '_id' | 'title'> }
  > {
    const product = await this.basicProductsService.findOne(productId)

    Object.keys(product.photos).forEach(key => {
      const newArray = product.photos[key].filter(ph => ph._id !== photoId.toString())

      if (newArray.length) {
        product.photos[key] = newArray
      } else {
        delete product.photos[key]
      }
    })

    const {
      _id,
      isPublished,
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
    } = await this.basicProductsService.update(productId, { photos: product.photos })

    const { title: leatherTitle } = await this.leatherArticlesService.findOne(leather)

    return {
      assignments,
      isPublished,
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
}
