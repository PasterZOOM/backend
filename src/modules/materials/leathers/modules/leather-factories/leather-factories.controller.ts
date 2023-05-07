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
} from '@nestjs/common'
import { ApiOkResponse, ApiTags, PickType } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { TCountry } from 'src/common/interfaces/country.type'
import { LeatherArticleEntity } from 'src/modules/materials/leathers/modules/leather-articles/entities/leather-article.entity'
import { LeatherArticlesService } from 'src/modules/materials/leathers/modules/leather-articles/leather-articles.service'
import { LeatherColorsService } from 'src/modules/materials/leathers/modules/leather-colors/leather-colors.service'
import { LeatherFactoryResponse } from 'src/modules/materials/leathers/modules/leather-factories/dto/leather-factory-response.dto'

import { CreateLeatherFactoryDto } from './dto/create-leather-factory.dto'
import { LeatherFactoryEntity } from './entities/leather-factory.entity'
import { LeatherFactoriesService } from './leather-factories.service'

@ApiTags('Leather-factories')
@Controller('leather-factories')
export class LeatherFactoriesController {
  constructor(
    private readonly leatherFactoriesService: LeatherFactoriesService,
    @Inject(forwardRef(() => LeatherColorsService))
    private readonly leatherColorService: LeatherColorsService,
    @Inject(forwardRef(() => LeatherArticlesService))
    private readonly leatherArticlesService: LeatherArticlesService
  ) {}

  @Post()
  async create(
    @Body() { country, title, description }: LeatherFactoryResponse,
    @Headers() { 'accept-language': locale }
  ): Promise<{ _id: Types.ObjectId; title: string }> {
    const createFactoryDto: CreateLeatherFactoryDto = {
      country,
      title: { en: '', ru: '', [locale]: title },
      description: { en: '', ru: '', [locale]: description },
    }
    const { _id } = await this.leatherFactoriesService.create(createFactoryDto)

    return {
      _id,
      title,
    }
  }

  @Get()
  @ApiOkResponse({
    type: [PickType(LeatherFactoryEntity, ['_id', 'title'])],
  })
  async findAll(
    @Headers() { 'accept-language': locale }
  ): Promise<{ _id: Types.ObjectId; title: string }[]> {
    const factories = await this.leatherFactoriesService.findAll()

    return factories.map(({ title, _id }) => ({ title: title[locale], _id }))
  }

  @Get(':id') // TODO написать возвращаемый тип для swagger
  async findOne(
    @Param('id') id: Types.ObjectId,
    @Headers() { 'accept-language': locale }
  ): Promise<
    Omit<LeatherFactoryEntity, 'articles'> & {
      articles: Pick<LeatherArticleEntity, '_id' | 'title'>[]
    }
  > {
    const { articles, _id, description, country, title } =
      await this.leatherFactoriesService.findOne(id)

    return {
      _id,
      description: description[locale],
      country,
      title: title[locale],
      articles: await Promise.all(
        articles.map(async articleId => {
          const { _id, title } = await this.leatherArticlesService.findOne(articleId)

          return { _id, title: title[locale] }
        })
      ),
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() updateFactoryDto: Partial<LeatherFactoryResponse>,
    @Headers() { 'accept-language': locale }: { 'accept-language': 'ru' | 'en' }
  ): Promise<{
    _id: Types.ObjectId
    country: TCountry
    title: string
    description: string
    articles: { _id: Types.ObjectId; title: string }[]
  }> {
    const { description, title } = await this.leatherFactoriesService.findOne(id)
    const {
      articles,
      _id,
      title: { [locale]: newTitle },
      description: { [locale]: newDescription },
      country,
    } = await this.leatherFactoriesService.update(id, {
      country: updateFactoryDto.country,
      title: updateFactoryDto.title ? { ...title, [locale]: updateFactoryDto.title } : undefined,
      description: updateFactoryDto.description
        ? { ...description, [locale]: updateFactoryDto.description }
        : undefined,
    })

    return {
      _id,
      country,
      title: newTitle,
      description: newDescription,
      articles: await Promise.all(
        articles.map(async articleId => {
          const { _id, title } = await this.leatherArticlesService.findOne(articleId)

          return { _id, title: title[locale] }
        })
      ),
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId): Promise<void> {
    const factory = await this.leatherFactoriesService.findOne(id)

    await Promise.all(
      factory.articles.map(async article => {
        const { colors } = await this.leatherArticlesService.findOne(article)

        await Promise.all(colors.map(color => this.leatherColorService.remove(color)))

        return this.leatherArticlesService.remove(article)
      })
    )

    await this.leatherFactoriesService.remove(id)
  }
}
