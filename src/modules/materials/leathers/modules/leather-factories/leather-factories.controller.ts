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
import { LocaleFieldEntity } from 'src/common/entities/locale-field.entity'
import { BasicProductsService } from 'src/modules/basic-products/basic-products.service'

import { LeatherArticlesService } from '../leather-articles/leather-articles.service'
import { LeatherColorsService } from '../leather-colors/leather-colors.service'

import { CreateLeatherFactoryDto } from './dto/create-leather-factory.dto'
import { LeatherFactoryResponse } from './dto/leather-factory-response.dto'
import { UpdateLeatherFactoryDto } from './dto/update-leather-factory.dto'
import { LeatherFactoriesService } from './leather-factories.service'
import { LeatherFactoryDocument } from './schemas/leather-factory.schema'

@ApiTags('Leather-factories')
@Controller('leather-factories')
export class LeatherFactoriesController {
  constructor(
    private readonly leatherFactoriesService: LeatherFactoriesService,
    @Inject(forwardRef(() => LeatherColorsService))
    private readonly leatherColorService: LeatherColorsService,
    @Inject(forwardRef(() => LeatherArticlesService))
    private readonly leatherArticlesService: LeatherArticlesService,
    @Inject(forwardRef(() => BasicProductsService))
    private readonly basicProductsService: BasicProductsService
  ) {}

  @Post()
  async create(
    @Body() { title, description, ...createLeatherFactory }: CreateLeatherFactoryDto,
    @Headers() { 'x-accept-language': locale }
  ): Promise<LeatherFactoryResponse> {
    const factory = await this.leatherFactoriesService.create({
      ...createLeatherFactory,
      title: { en: '', ru: '', [locale]: title },
      description: { en: '', ru: '', [locale]: description },
    })

    return this.generateResponseFactory({ locale, factory })
  }

  @Get()
  async findAll(@Headers() { 'x-accept-language': locale }): Promise<LeatherFactoryResponse[]> {
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
    await this.basicProductsService.deleteMany({ 'leather.factory': id })
    await this.leatherArticlesService.deleteMany({ factory: id })
    await this.leatherColorService.deleteMany({ factory: id })

    await this.leatherFactoriesService.remove(id)
  }

  async generateResponseFactory({
    locale,
    factory,
  }: GenerateResponseFactoryParams): Promise<LeatherFactoryResponse> {
    const articles = (
      await this.leatherArticlesService.findAll({ _id: { $in: factory.articles } }, { title: true })
    ).map(({ _id, title }) => ({ _id, title: title[locale] }))

    return {
      ...factory.toJSON(),
      articles,
      title: factory.title[locale],
      description: factory.description[locale],
    }
  }
}

type GenerateResponseFactoryParams = { factory: LeatherFactoryDocument; locale: string }
