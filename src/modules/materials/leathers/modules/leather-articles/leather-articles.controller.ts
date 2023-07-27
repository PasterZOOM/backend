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
import { ApiTags } from '@nestjs/swagger'
import { FilterQuery, Types } from 'mongoose'
import { LocaleFieldEntity } from 'src/common/entities/locale-field.entity'
import { UpdateLeatherArticleDto } from 'src/modules/materials/leathers/modules/leather-articles/dto/update-leather-article.dto'
import { LeatherArticleDocument } from 'src/modules/materials/leathers/modules/leather-articles/schemas/leather-article.schema'

import { LeatherColorsService } from '../leather-colors/leather-colors.service'
import { LeatherFactoriesService } from '../leather-factories/leather-factories.service'

import { CreateLeatherArticleDto } from './dto/create-leather-article.dto'
import { LeatherArticleResponse } from './dto/leather-article-responce.dto'
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
    @Body() { title, description, ...createLeatherArticle }: CreateLeatherArticleDto,
    @Param('factoryId') factoryId: Types.ObjectId,
    @Headers() { 'x-accept-language': locale }
  ): Promise<LeatherArticleResponse> {
    const article = await this.leatherArticlesService.create({
      title: { en: '', ru: '', [locale]: title },
      description: { en: '', ru: '', [locale]: description },
      factory: factoryId,
      ...createLeatherArticle,
    })

    await this.leatherFactoriesService.push(factoryId, { articles: article._id })

    return this.generateResponseArticle({ locale, article })
  }

  @Get()
  async findAll(
    @Headers() { 'x-accept-language': locale },
    @Query('filter') filter: FilterQuery<LeatherArticleEntity>
  ): Promise<LeatherArticleResponse[]> {
    const articles = await this.leatherArticlesService.findAll(filter)

    return Promise.all(articles.map(article => this.generateResponseArticle({ locale, article })))
  }

  @Get(':id')
  async findOne(
    @Param('id') id: Types.ObjectId,
    @Headers() { 'x-accept-language': locale }
  ): Promise<LeatherArticleResponse> {
    const article = await this.leatherArticlesService.findOne(id)

    return this.generateResponseArticle({ locale, article })
  }

  @Patch(':id') // TODO сделать возможность изменять фабрику для артикула (так же реализовать это на фронте)
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() updateLeatherArticleDto: Partial<UpdateLeatherArticleDto>,
    @Headers() { 'x-accept-language': locale }: { 'x-accept-language': keyof LocaleFieldEntity }
  ): Promise<LeatherArticleResponse> {
    const { description, title } = await this.leatherArticlesService.findOne(id)

    const article = await this.leatherArticlesService.update(id, {
      ...updateLeatherArticleDto,
      title: updateLeatherArticleDto.title && { ...title, [locale]: updateLeatherArticleDto.title },
      description: updateLeatherArticleDto.description && {
        ...description,
        [locale]: updateLeatherArticleDto.description,
      },
    })

    return this.generateResponseArticle({ locale, article })
  }

  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId): Promise<void> {
    const article = await this.leatherArticlesService.findOne(id)
    const factory = await this.leatherFactoriesService.findOne(article.factory)

    if (factory) {
      await this.leatherFactoriesService.pull(factory._id, { articles: id })
    }
    await Promise.all(article.colors.map(color => this.leatherColorService.remove(color)))

    await this.leatherArticlesService.remove(id)
  }

  async generateResponseArticle({
    locale,
    article,
  }: GenerateResponseArticleParams): Promise<LeatherArticleResponse> {
    const factory = await this.leatherFactoriesService.findOne(article.factory)

    const colors = (await this.leatherColorService.findAll({ _id: { $in: article.colors } })).map(
      ({ _id, title }) => ({ _id, title: title[locale] })
    )

    return {
      ...article.toJSON(),
      colors,
      title: article.title[locale],
      description: article.description[locale],
      factory: { _id: factory.id, title: factory.title[locale] },
    }
  }
}

type GenerateResponseArticleParams = {
  article: LeatherArticleDocument
  locale: string
}
