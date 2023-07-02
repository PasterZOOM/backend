import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
  Headers,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common'
import { ApiOkResponse, ApiTags, PickType } from '@nestjs/swagger'
import { FilterQuery, Types } from 'mongoose'
import { BasEntity } from 'src/common/entities/base.entity'
import { LocaleFieldEntity } from 'src/common/entities/locale-field.entity'
import { BadIdException } from 'src/common/exceptions/badId.Exceptions'
import { LeatherArticleResponse } from 'src/modules/materials/leathers/modules/leather-articles/dto/leather-article-responce.dto'
import { LeatherColorEntity } from 'src/modules/materials/leathers/modules/leather-colors/entities/leather-color.entity'
import { LeatherFactoryEntity } from 'src/modules/materials/leathers/modules/leather-factories/entities/leather-factory.entity'

import { LeatherColorsService } from '../leather-colors/leather-colors.service'
import { LeatherFactoriesService } from '../leather-factories/leather-factories.service'

import { LeatherArticleEntity } from './entities/leather-article.entity'
import { LeatherArticlesService } from './leather-articles.service'

@ApiTags('Leather-articles')
@Controller('leather-articles')
export class LeatherArticlesController {
  constructor(
    private readonly leatherArticlesService: LeatherArticlesService,
    @Inject(forwardRef(() => LeatherColorsService))
    private readonly leatherColorService: LeatherColorsService,
    @Inject(forwardRef(() => LeatherFactoriesService))
    private readonly leatherFactoriesService: LeatherFactoriesService
  ) {}

  @Post(':factoryId')
  async create(
    @Body() { title, description, ...createLeatherArticle }: LeatherArticleResponse,
    @Param('factoryId') factoryId: Types.ObjectId,
    @Headers() { 'x-accept-language': locale }
  ): Promise<BasEntity> {
    try {
      const factory = await this.leatherFactoriesService.findOne(factoryId)

      const { _id } = await this.leatherArticlesService.create({
        title: { en: '', ru: '', [locale]: title },
        description: { en: '', ru: '', [locale]: description },
        factory: factoryId,
        ...createLeatherArticle,
      })

      await this.leatherFactoriesService.push(factory._id, { articles: _id })

      return { _id, title }
    } catch (e) {
      throw new BadIdException('factory', e)
    }
  }

  @Get()
  @ApiOkResponse({
    type: [PickType(LeatherArticleEntity, ['_id', 'title', 'value'])],
  })
  async findAll(
    @Headers() { 'x-accept-language': locale },
    @Query('filter') filter: FilterQuery<LeatherArticleEntity>
  ): Promise<BasEntity[]> {
    const articles = await this.leatherArticlesService.findAll(filter)

    return articles.map(({ title, _id, value }) => ({ title: title[locale], _id, value }))
  }

  @Get(':id') // TODO написать возвращаемый тип для swagger
  async findOne(
    @Param('id') id: Types.ObjectId,
    @Headers() { 'x-accept-language': locale }
  ): Promise<
    Omit<LeatherArticleEntity, 'colors' | 'factory'> & {
      colors: Pick<LeatherColorEntity, '_id' | 'title'>[]
      factory: Pick<LeatherFactoryEntity, '_id' | 'title'>
    }
  > {
    const { _id, description, factory, title, colors, value } =
      await this.leatherArticlesService.findOne(id)
    const { title: factoryTitle } = await this.leatherFactoriesService.findOne(factory)

    return {
      _id,
      value,
      description: description[locale],
      title: title[locale],
      factory: { _id: factory, title: factoryTitle[locale] },
      colors: await Promise.all(
        colors.map(async colorId => {
          const { _id, title } = await this.leatherColorService.findOne(colorId)

          return { _id, title: title[locale] }
        })
      ),
    }
  }

  @Patch(':id') // TODO сделать возможность изменять фабрику для артикула (так же реализовать это на фронте)
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() { value, ...updateLeatherArticleDto }: Partial<LeatherArticleResponse>,
    @Headers() { 'x-accept-language': locale }: { 'x-accept-language': keyof LocaleFieldEntity }
  ): Promise<{
    _id: Types.ObjectId
    title: string
    description: string
    value: string
    factory: BasEntity
    colors: BasEntity[]
  }> {
    const { description, title } = await this.leatherArticlesService.findOne(id)
    const {
      _id,
      title: { [locale]: newTitle },
      colors,
      description: { [locale]: newDescription },
      factory,
      value: newValue,
    } = await this.leatherArticlesService.update(id, {
      value,
      title: updateLeatherArticleDto.title && { ...title, [locale]: updateLeatherArticleDto.title },
      description: updateLeatherArticleDto.description && {
        ...description,
        [locale]: updateLeatherArticleDto.description,
      },
    })

    const { title: factoryTitle } = await this.leatherFactoriesService.findOne(factory)

    return {
      _id,
      value: newValue,
      description: newDescription,
      title: newTitle,
      factory: { _id: factory, title: factoryTitle[locale] },
      colors: await Promise.all(
        colors.map(async colorId => {
          const { _id, title } = await this.leatherColorService.findOne(colorId)

          return { _id, title: title[locale] }
        })
      ),
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId): Promise<void> {
    try {
      const article = await this.leatherArticlesService.findOne(id)
      const factory = await this.leatherFactoriesService.findOne(article.factory)

      if (factory) {
        await this.leatherFactoriesService.pull(factory._id, { articles: id })
      }
      await Promise.all(article.colors.map(color => this.leatherColorService.remove(color)))

      await this.leatherArticlesService.remove(id)
    } catch (e) {
      throw new BadIdException('address', e)
    }
  }
}
