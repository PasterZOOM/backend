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
import { LeatherArticleDocument } from 'src/modules/materials/leathers/modules/leather-articles/schemas/leather-article.schema'
import { LeatherColorDocument } from 'src/modules/materials/leathers/modules/leather-colors/schemas/leather-color.schema'
import { v1 } from 'uuid'

import { LeatherArticlesService } from '../materials/leathers/modules/leather-articles/leather-articles.service'
import { LeatherColorsService } from '../materials/leathers/modules/leather-colors/leather-colors.service'
import { LeatherFactoriesService } from '../materials/leathers/modules/leather-factories/leather-factories.service'

import { BasicProductsService } from './basic-products.service'
import { BasicProductResponse } from './dto/basic-product-response.dto'
import { UpdateBasicProductDto } from './dto/update-basic-product.dto'
import { BasicProductColor } from './entities/basic-product-color.entity'
import { EFilterKeys } from './entities/basic-product.type'
import { CreateBasicProductResponse } from './entities/create-basic-product-response.entity'
import { BasicProductDocument } from './schemas/basic-product.schema'

@ApiTags('Basic-products')
@Controller('basic-products')
export class BasicProductsController {
  constructor(
    private readonly basicProductsService: BasicProductsService,
    private readonly leatherColorsService: LeatherColorsService,
    private readonly leatherArticlesService: LeatherArticlesService,
    private readonly leatherFactoriesService: LeatherFactoriesService
  ) {}

  @Post()
  async create(
    @Body()
    {
      title,
      description,
      size,
      leather: { article, factory },
      ...createBasicProductDto
    }: CreateBasicProductResponse,
    @Headers() { 'x-accept-language': locale }
  ): Promise<BasicProductResponse> {
    const product = await this.basicProductsService.create({
      ...createBasicProductDto,
      title: { en: '', ru: '', [locale]: title },
      description: { en: '', ru: '', [locale]: description },
      size: { en: '', ru: '', [locale]: size },
      leather: {
        article: Types.ObjectId.createFromHexString(article),
        factory: Types.ObjectId.createFromHexString(factory),
      },
    })

    return this.generateResponseProduct({ locale, product })
  }

  @Get()
  @ApiQuery({ name: EFilterKeys.ASSIGNMENTS, required: false })
  @ApiQuery({ name: EFilterKeys.CATEGORIES, required: false })
  @ApiQuery({ name: EFilterKeys.LEATHER_COLORS, required: false })
  @ApiQuery({ name: EFilterKeys.LEATHERS, required: false })
  @ApiQuery({ name: EFilterKeys.SEARCH, required: false })
  async findAll(
    @Headers() { 'x-accept-language': locale },
    @Query(EFilterKeys.ASSIGNMENTS) assignments?: string[] | string,
    @Query(EFilterKeys.CATEGORIES) categories?: string[] | string,
    @Query(EFilterKeys.LEATHER_COLORS) leatherColors?: string[] | string,
    @Query(EFilterKeys.LEATHERS) leathers?: string[] | string,
    @Query(EFilterKeys.SEARCH) search?: string,
    @Query(EFilterKeys.PAGE) page = '1',
    @Query(EFilterKeys.PAGE_SIZE) pageSize: string = undefined
  ): Promise<{ data: Awaited<BasicProductResponse>[]; totalCount: number }> {
    const colorIds: Pick<LeatherColorDocument, '_id'>[] | undefined = leatherColors
      ? await this.leatherColorsService.findAll({ value: { $in: leatherColors } }, { _id: true })
      : undefined

    if (leatherColors && !colorIds?.length) {
      return {
        data: [],
        totalCount: 0,
      }
    }

    const leathersId: Pick<LeatherArticleDocument, '_id'>[] | undefined = leathers
      ? await this.leatherArticlesService.findAll({ value: { $in: leathers } }, { _id: true })
      : undefined

    const regex = new RegExp(search, 'i')

    const filters: FilterQuery<BasicProductDocument> = {
      $and: [
        categories ? { category: { $in: [categories].flat() } } : {},
        assignments ? { assignments: { $in: [assignments].flat() } } : {},
        leathersId?.length ? { 'leather.article': { $in: leathersId.map(({ _id }) => _id) } } : {},
        colorIds?.length
          ? {
              $or: colorIds.map(color => ({
                [`photos.${color._id.toString()}`]: { $exists: true },
              })),
            }
          : {},
        search
          ? {
              $or: [
                { [`title.${locale}`]: { $regex: regex } },
                { [`description.${locale}`]: { $regex: regex } },
              ],
            }
          : {},
      ],
    }

    const skip = +page * +pageSize - +pageSize

    const basicProducts: BasicProductDocument[] = await this.basicProductsService.findAll(
      filters,
      +pageSize,
      skip
    )

    const totalCount: number = await this.basicProductsService.countDocuments(filters)

    const data = await Promise.all(
      basicProducts.map(async product => {
        const prod = await this.generateResponseProduct({ locale, product })

        if (leatherColors) {
          const { photos } = prod

          const productColors = prod.productColors.filter(color => {
            const colorId = color._id.toString()

            if (!colorIds.some(el => el._id.toString() === colorId)) {
              delete photos[colorId]

              return false
            }

            return true
          })

          return { ...prod, photos, productColors }
        }

        return prod
      })
    )

    return {
      data,
      totalCount,
    }
  }

  @Get(':id')
  async findOne(
    @Headers() { 'x-accept-language': locale },
    @Param('id') id: Types.ObjectId
  ): Promise<BasicProductResponse> {
    const product = await this.basicProductsService.findOne(id)

    return this.generateResponseProduct({ locale, product })
  }

  @Patch(':id')
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() updateBasicProductDto: UpdateBasicProductDto,
    @Headers() { 'x-accept-language': locale }
  ): Promise<BasicProductResponse> {
    const { size, title, description } = await this.basicProductsService.findOne(id)

    const updatedProduct = await this.basicProductsService.update(id, {
      ...updateBasicProductDto,
      title: updateBasicProductDto.title && { ...title, [locale]: updateBasicProductDto.title },
      size: updateBasicProductDto.size && { ...size, [locale]: updateBasicProductDto.size },
      description: updateBasicProductDto.description && {
        ...description,
        [locale]: updateBasicProductDto.description,
      },
    })

    return this.generateResponseProduct({ locale, product: updatedProduct })
  }

  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId): Promise<void> {
    await this.basicProductsService.remove(id)
  }

  @Put(':id/photo')
  async addPhoto(
    @Headers() { 'x-accept-language': locale },
    @Param('id') id: Types.ObjectId,
    @Body() photo: { [key: string]: string[] }
  ): Promise<BasicProductResponse> {
    const product = await this.basicProductsService.findOne(id)

    Object.keys(photo).forEach(key => {
      const photos = photo[key].map(url => ({ _id: v1(), url }))

      if (product.photos[key]) {
        product.photos[key] = [...product.photos[key], ...photos]
      } else {
        product.photos[key] = photos
      }
    })

    const updatedProduct = await this.basicProductsService.update(id, {
      photos: product.photos,
    })

    return this.generateResponseProduct({ locale, product: updatedProduct })
  }

  @Delete(':productId/photo/:photoId')
  async removePhoto(
    @Headers() { 'x-accept-language': locale },
    @Param('productId') productId: Types.ObjectId,
    @Param('photoId') photoId: Types.ObjectId
  ): Promise<BasicProductResponse> {
    const product = await this.basicProductsService.findOne(productId)

    Object.keys(product.photos).forEach(key => {
      const newArray = product.photos[key].filter(ph => ph._id !== photoId.toString())

      if (newArray.length) {
        product.photos[key] = newArray
      } else {
        delete product.photos[key]
      }
    })

    const updatedProduct = await this.basicProductsService.update(productId, {
      photos: product.photos,
    })

    return this.generateResponseProduct({ locale, product: updatedProduct })
  }

  async generateResponseProduct({
    locale,
    product,
  }: GenerateResponseProductParams): Promise<BasicProductResponse> {
    const productColors: BasicProductColor[] = (
      await this.leatherColorsService.findAll({ _id: { $in: Object.keys(product.photos) } })
    )
      .map(({ _id, photo, title }) => ({ _id, photo, title: title[locale] }))
      .sort((a, b) => (a.title > b.title ? 1 : -1))

    const leatherArticle = await this.leatherArticlesService.findOne(product.leather.article, {
      title: true,
    })
    const leatherFactory = await this.leatherFactoriesService.findOne(product.leather.factory, {
      title: true,
    })

    const leather = {
      article: { _id: leatherArticle._id, title: leatherArticle.title[locale] },
      factory: { _id: leatherFactory._id, title: leatherFactory.title[locale] },
    }

    return {
      ...product.toJSON(),
      leather,
      productColors,
      size: product.size[locale],
      title: product.title[locale],
      description: product.description[locale],
    }
  }
}

type GenerateResponseProductParams = { locale: string; product: BasicProductDocument }
