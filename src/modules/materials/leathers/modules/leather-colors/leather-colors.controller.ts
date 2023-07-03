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
import { ApiQuery, ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { LocaleFieldEntity } from 'src/common/entities/locale-field.entity'
import { BadIdException } from 'src/common/exceptions/badId.Exceptions'

import { LeatherArticlesService } from '../leather-articles/leather-articles.service'

import { CreateLeatherColorDto } from './dto/create-leather-color.dto'
import { LeatherColorResponse } from './dto/leather-color-response.dto'
import { LeatherColorsService } from './leather-colors.service'
import { LeatherColorDocument } from './schemas/leather-color.schema'

@ApiTags('Leather-colors')
@Controller('leather-colors')
export class LeatherColorsController {
  constructor(
    private readonly leatherColorsService: LeatherColorsService,
    @Inject(forwardRef(() => LeatherArticlesService))
    private readonly leatherArticlesService: LeatherArticlesService
  ) {}

  @Post(':articleId')
  async create(
    @Body() { title, description, ...createLeatherColor }: CreateLeatherColorDto,
    @Param('articleId') articleId: Types.ObjectId,
    @Headers() { 'x-accept-language': locale }
  ): Promise<LeatherColorResponse> {
    const color = await this.leatherColorsService.create({
      ...createLeatherColor,
      title: { en: '', ru: '', [locale]: title },
      description: { en: '', ru: '', [locale]: description },
      article: articleId,
    })

    await this.leatherArticlesService.push(articleId, { colors: color._id })

    return this.generateResponseArticle({ locale, color })
  }

  @Get()
  @ApiQuery({ name: '_id', required: false })
  async findAll(
    @Headers() { 'x-accept-language': locale },
    @Query('_id') _id?: Types.ObjectId[]
  ): Promise<LeatherColorResponse[]> {
    const colors = await this.leatherColorsService.findAll(
      _id ? { $or: _id.map(_id => ({ _id })) } : undefined
    )

    return Promise.all(colors.map(color => this.generateResponseArticle({ locale, color })))
  }

  @Get(':id') // TODO написать возвращаемый тип для swagger
  async findOne(
    @Param('id') id: Types.ObjectId,
    @Headers() { 'x-accept-language': locale }
  ): Promise<LeatherColorResponse> {
    const color = await this.leatherColorsService.findOne(id)

    return this.generateResponseArticle({ locale, color })
  }

  @Patch(':id')
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() { ...updateLeatherColorDto }: Partial<LeatherColorResponse>,
    @Headers() { 'x-accept-language': locale }: { 'x-accept-language': keyof LocaleFieldEntity }
  ): Promise<LeatherColorResponse> {
    const { description, title } = await this.leatherColorsService.findOne(id)

    const color = await this.leatherColorsService.update(id, {
      ...updateLeatherColorDto,
      title: updateLeatherColorDto.title && { ...title, [locale]: updateLeatherColorDto.title },
      description: updateLeatherColorDto.description && {
        ...description,
        [locale]: updateLeatherColorDto.description,
      },
    })

    return this.generateResponseArticle({ locale, color })
  }

  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId): Promise<void> {
    try {
      const color = await this.leatherColorsService.findOne(id)
      const article = await this.leatherArticlesService.findOne(color.article)

      if (article) {
        await this.leatherArticlesService.pull(article._id, { colors: id })
      }

      await this.leatherColorsService.remove(id)
    } catch (e) {
      throw new BadIdException('address', e)
    }
  }

  async generateResponseArticle({
    locale,
    color,
  }: GenerateResponseColorParams): Promise<LeatherColorResponse> {
    const article = await this.leatherArticlesService.findOne(color.article)

    return {
      ...color.toJSON(),
      title: color.title[locale],
      description: color.description[locale],
      article: { _id: article.id, title: article.title[locale] },
    }
  }
}

type GenerateResponseColorParams = {
  locale: string
  color: LeatherColorDocument
}
