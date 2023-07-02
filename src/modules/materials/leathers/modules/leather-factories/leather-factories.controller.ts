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
import { ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { BasEntity } from 'src/common/entities/base.entity'
import { LocaleFieldEntity } from 'src/common/entities/locale-field.entity'
import { CreateLeatherFactoryDto } from 'src/modules/materials/leathers/modules/leather-factories/dto/create-leather-factory.dto'
import { LeatherFactoryResponse } from 'src/modules/materials/leathers/modules/leather-factories/dto/leather-factory-response.dto'
import { UpdateLeatherFactoryDto } from 'src/modules/materials/leathers/modules/leather-factories/dto/update-leather-factory.dto'
import { LeatherFactoryDocument } from 'src/modules/materials/leathers/modules/leather-factories/schemas/leather-factory.schema'

import { LeatherArticlesService } from '../leather-articles/leather-articles.service'
import { LeatherColorsService } from '../leather-colors/leather-colors.service'

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
    @Body() { country, title, description }: CreateLeatherFactoryDto,
    @Headers() { 'x-accept-language': locale }
  ): Promise<LeatherFactoryResponse> {
    const factory = await this.leatherFactoriesService.create({
      country,
      title: { en: '', ru: '', [locale]: title },
      description: { en: '', ru: '', [locale]: description },
    })

    return this.generateResponseFactory({ locale, factory })
  }

  @Get()
  async findAll(@Headers() { 'x-accept-language': locale }): Promise<BasEntity[]> {
    const factories = await this.leatherFactoriesService.findAll()

    return Promise.all(factories.map(factory => this.generateResponseFactory({ locale, factory })))
  }

  @Get(':id')
  async findOne(
    @Param('id') id: Types.ObjectId,
    @Headers() { 'x-accept-language': locale }
  ): Promise<LeatherFactoryResponse> {
    const factory = await this.leatherFactoriesService.findOne(id)

    return this.generateResponseFactory({ locale, factory })
  }

  @Patch(':id')
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() updateFactoryDto: Partial<UpdateLeatherFactoryDto>,
    @Headers() { 'x-accept-language': locale }: { 'x-accept-language': keyof LocaleFieldEntity }
  ): Promise<LeatherFactoryResponse> {
    const { description, title } = await this.leatherFactoriesService.findOne(id)

    const factory = await this.leatherFactoriesService.update(id, {
      ...updateFactoryDto,
      title: updateFactoryDto.title && { ...title, [locale]: updateFactoryDto.title },
      description: updateFactoryDto.description && {
        ...description,
        [locale]: updateFactoryDto.description,
      },
    })

    return this.generateResponseFactory({ locale, factory })
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

  async generateResponseFactory({
    locale,
    factory,
  }: GenerateResponseArticleParams): Promise<LeatherFactoryResponse> {
    const articles = (
      await this.leatherArticlesService.findAll({ _id: { $in: factory.articles } })
    ).map(({ _id, title }) => ({ _id, title: title[locale] }))

    return {
      ...factory.toJSON(),
      articles,
      title: factory.title[locale],
      description: factory.description[locale],
    }
  }
}

type GenerateResponseArticleParams = { locale: string; factory: LeatherFactoryDocument }
