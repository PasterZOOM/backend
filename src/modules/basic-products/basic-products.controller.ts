import {
  Body,
  Controller,
  Delete,
  Get,
  Headers,
  Param,
  Patch,
  Post,
  Put,
  Query,
} from '@nestjs/common'
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { FilterQuery, Types } from 'mongoose'
import { BasicProductResponse } from 'src/modules/basic-products/dto/basic-product-response.dto'
import { v1 } from 'uuid'

import { LeatherArticleEntity } from '../materials/leathers/modules/leather-articles/entities/leather-article.entity'
import { LeatherArticlesService } from '../materials/leathers/modules/leather-articles/leather-articles.service'
import { LeatherColorsService } from '../materials/leathers/modules/leather-colors/leather-colors.service'

import { BasicProductsService } from './basic-products.service'
import { UpdateBasicProductDto } from './dto/update-basic-product.dto'
import { BasicProductEntity } from './entities/basic-product.entity'
import { EFilterKeys, ProductPhotoType } from './entities/basic-product.type'
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
  async create(
    @Body() { title, description, size, ...createBasicProductDto }: BasicProductResponse,
    @Headers() { 'accept-language': locale }
  ): Promise<{ _id: Types.ObjectId; title: string }> {
    const { _id } = await this.basicProductsService.create({
      ...createBasicProductDto,
      title: { en: '', ru: '', [locale]: title },
      description: { en: '', ru: '', [locale]: description },
      size: { en: '', ru: '', [locale]: size },
      photos: {},
      isPublished: false,
    })

    return { _id, title }
  }

  @Get() // TODO написать возвращаемый тип для swagger
  @ApiQuery({ name: EFilterKeys.ASSIGNMENTS, required: false })
  @ApiQuery({ name: EFilterKeys.CATEGORIES, required: false })
  @ApiQuery({ name: EFilterKeys.LEATHER_COLORS, required: false })
  @ApiQuery({ name: EFilterKeys.LEATHERS, required: false })
  async findAll(
    @Headers() { 'accept-language': locale },
    @Query(EFilterKeys.ASSIGNMENTS) assignments?: string[],
    @Query(EFilterKeys.CATEGORIES) categories?: string[],
    @Query(EFilterKeys.LEATHER_COLORS) leatherColors?: string[],
    @Query(EFilterKeys.LEATHERS) leathers?: string[]
  ): Promise<
    Awaited<
      Omit<BasicProductEntity, 'leather'> & {
        leather: Pick<LeatherArticleEntity, '_id' | 'title'>
        productColors: { _id: Types.ObjectId; photo: string; title: string }[]
      }
    >[]
  > {
    const colors = leatherColors
      ? (
          await Promise.all(
            leatherColors.map(async value => {
              const colors = await this.leatherColorsService.findAll({ value })

              return colors.map(color => color._id).join(',')
            })
          )
        )
          .map(color => color.split(','))
          .flat()
      : undefined

    const filters = async (): Promise<FilterQuery<BasicProductDocument>> => {
      const filters: Partial<Record<EFilterKeys, string[] | undefined>> = {
        [EFilterKeys.ASSIGNMENTS]: assignments,
        [EFilterKeys.CATEGORIES]: categories,
        [EFilterKeys.LEATHER_COLORS]: colors,
        [EFilterKeys.LEATHERS]: leathers,
      }

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
            const key = `title.${locale}`
            const { _id } = await this.leatherArticlesService.find({ [key]: leather })

            return { leather: _id }
          })
        )
      }
      if (filters.assignments) {
        assignmentsArray = filters.assignments.map(assignments => ({ assignments }))
      }
      if (filters.leatherColors) {
        colorsArray = filters.leatherColors.map(color => {
          const key = `photos.${color}`

          return {
            [key]: { $exists: true },
          }
        })
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

    const basicProducts = await this.basicProductsService.findAll(await filters())

    return (
      await Promise.all(
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
            const filteredPhotos: Record<string, ProductPhotoType[]> = {}
            const productColors: { _id: Types.ObjectId; photo: string; title: string }[] = []

            await Promise.all(
              Object.entries(photos).map(async ([colorId, photos]) => {
                const pushProductColor = async (): Promise<void> => {
                  const { _id, photo, title } = await this.leatherColorsService.findOne(
                    colorId as unknown as Types.ObjectId
                  )

                  productColors.push({ _id, photo, title: title[locale] })
                }

                if (colors && colors.includes(colorId)) {
                  filteredPhotos[colorId] = photos
                  await pushProductColor()
                } else if (!colors) {
                  await pushProductColor()
                }
              })
            )

            const { title: leatherTitle } = await this.leatherArticlesService.findOne(leather)

            return {
              assignments,
              isPublished,
              _id,
              punchPitch,
              costCurrency,
              category,
              cost,
              size: size[locale],
              title: title[locale],
              description: description[locale],
              leather: { _id: leather, title: leatherTitle[locale] },
              photos: colors ? filteredPhotos : photos,
              productColors: productColors.sort((a, b) => (a.title > b.title ? 1 : -1)),
            }
          }
        )
      )
    ).filter(el => (colors ? el.productColors.length !== 0 : true))
  }

  @Get(':id') // TODO написать возвращаемый тип для swagger
  async findOne(
    @Headers() { 'accept-language': locale },
    @Param('id') id: Types.ObjectId
  ): Promise<
    Omit<BasicProductEntity, 'leather'> & {
      leather: Pick<LeatherArticleEntity, '_id' | 'title'>
      productColors: { _id: Types.ObjectId; photo: string; title: string }[]
    }
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

    const productColors: { _id: Types.ObjectId; photo: string; title: string }[] = []

    await Promise.all(
      Object.keys(photos).map(async colorId => {
        const { _id, photo, title } = await this.leatherColorsService.findOne(
          colorId as unknown as Types.ObjectId
        )

        productColors.push({ _id, photo, title: title[locale] })
      })
    )
    const { title: leatherTitle } = await this.leatherArticlesService.findOne(leather)

    return {
      assignments,
      isPublished,
      _id,
      punchPitch,
      photos,
      costCurrency,
      category,
      cost,
      size: size[locale],
      title: title[locale],
      description: description[locale],
      leather: { _id: leather, title: leatherTitle[locale] },
      productColors: productColors.sort((a, b) => (a.title > b.title ? 1 : -1)),
    }
  }

  @Patch(':id') // TODO написать возвращаемый тип для swagger
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() updateBasicProductDto: UpdateBasicProductDto,
    @Headers() { 'accept-language': locale }: { 'accept-language': 'ru' | 'en' }
  ): Promise<
    Omit<BasicProductEntity, 'leather' | 'size' | 'title' | 'description'> & {
      size: string
      title: string
      description: string
      leather: { _id: Types.ObjectId; title: string }
      productColors: { _id: Types.ObjectId; photo: string; title: string }[]
    }
  > {
    const { size, title, description } = await this.basicProductsService.findOne(id)
    const {
      _id,
      isPublished,
      title: { [locale]: newTitle },
      description: { [locale]: newDescription },
      size: { [locale]: newSize },
      photos,
      punchPitch,
      leather,
      assignments,
      costCurrency,
      cost,
      category,
    } = await this.basicProductsService.update(id, {
      ...updateBasicProductDto,
      title: updateBasicProductDto.title && { ...title, [locale]: updateBasicProductDto.title },
      size: updateBasicProductDto.size && { ...size, [locale]: updateBasicProductDto.size },
      description: updateBasicProductDto.description && {
        ...description,
        [locale]: updateBasicProductDto.description,
      },
    })
    const productColors: { _id: Types.ObjectId; photo: string; title: string }[] = []

    await Promise.all(
      Object.keys(photos).map(async colorId => {
        const { _id, photo, title } = await this.leatherColorsService.findOne(
          colorId as unknown as Types.ObjectId
        )

        productColors.push({ _id, photo, title: title[locale] })
      })
    )
    const { title: leatherTitle } = await this.leatherArticlesService.findOne(leather)

    return {
      assignments,
      isPublished,
      _id,
      punchPitch,
      photos,
      costCurrency,
      category,
      cost,
      size: newSize,
      title: newTitle,
      description: newDescription,
      leather: { _id: leather, title: leatherTitle[locale] },
      productColors: productColors.sort((a, b) => (a.title > b.title ? 1 : -1)),
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId): Promise<void> {
    await this.basicProductsService.remove(id)
  }

  @Put(':id/photo')
  async addPhoto(
    @Headers() { 'accept-language': locale },
    @Param('id') id: Types.ObjectId,
    @Body() photo: { [key: string]: string[] }
  ): Promise<
    Omit<BasicProductEntity, 'leather'> & {
      leather: Pick<LeatherArticleEntity, '_id' | 'title'>
      productColors: { _id: Types.ObjectId; photo: string; title: string }[]
    }
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
    const productColors: { _id: Types.ObjectId; photo: string; title: string }[] = []

    await Promise.all(
      Object.keys(photos).map(async colorId => {
        const { _id, photo, title } = await this.leatherColorsService.findOne(
          colorId as unknown as Types.ObjectId
        )

        productColors.push({ _id, photo, title: title[locale] })
      })
    )
    const { title: leatherTitle } = await this.leatherArticlesService.findOne(leather)

    return {
      assignments,
      isPublished,
      _id,
      punchPitch,
      photos,
      costCurrency,
      category,
      cost,
      size: size[locale],
      title: title[locale],
      description: description[locale],
      leather: { _id: leather, title: leatherTitle[locale] },
      productColors: productColors.sort((a, b) => (a.title > b.title ? 1 : -1)),
    }
  }

  @Delete(':productId/photo/:photoId')
  async removePhoto(
    @Headers() { 'accept-language': locale },
    @Param('productId') productId: Types.ObjectId,
    @Param('photoId') photoId: Types.ObjectId
  ): Promise<
    Omit<BasicProductEntity, 'leather'> & {
      leather: Pick<LeatherArticleEntity, '_id' | 'title'>
      productColors: { _id: Types.ObjectId; photo: string; title: string }[]
    }
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
    const productColors: { _id: Types.ObjectId; photo: string; title: string }[] = []

    await Promise.all(
      Object.keys(photos).map(async colorId => {
        const { _id, photo, title } = await this.leatherColorsService.findOne(
          colorId as unknown as Types.ObjectId
        )

        productColors.push({ _id, photo, title: title[locale] })
      })
    )
    const { title: leatherTitle } = await this.leatherArticlesService.findOne(leather)

    return {
      assignments,
      isPublished,
      _id,
      punchPitch,
      photos,
      costCurrency,
      category,
      cost,
      size: size[locale],
      title: title[locale],
      description: description[locale],
      leather: { _id: leather, title: leatherTitle[locale] },
      productColors: productColors.sort((a, b) => (a.title > b.title ? 1 : -1)),
    }
  }
}
