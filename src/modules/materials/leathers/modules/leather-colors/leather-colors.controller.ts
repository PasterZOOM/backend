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
import { BadIdException } from 'src/common/exceptions/badId.Exceptions'
import { LeatherArticleEntity } from 'src/modules/materials/leathers/modules/leather-articles/entities/leather-article.entity'
import { LeatherColorResponse } from 'src/modules/materials/leathers/modules/leather-colors/dto/leather-color-response.dto'

import { LeatherArticlesService } from '../leather-articles/leather-articles.service'

import { LeatherColorEntity } from './entities/leather-color.entity'
import { LeatherColorsService } from './leather-colors.service'

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
    @Body() { title, description, ...createLeatherColor }: LeatherColorResponse,
    @Param('articleId') articleId: Types.ObjectId,
    @Headers() { 'accept-language': locale }
  ): Promise<{ _id: Types.ObjectId; title: string; photo: string }> {
    try {
      const { _id, photo } = await this.leatherColorsService.create({
        title: { en: '', ru: '', [locale]: title },
        description: { en: '', ru: '', [locale]: description },
        article: articleId,
        ...createLeatherColor,
      })

      await this.leatherArticlesService.push(articleId, { colors: _id })

      return { title, _id, photo }
    } catch (e) {
      throw new BadIdException('factory', e)
    }
  }

  @Get()
  @ApiQuery({ name: '_id', required: false })
  async findAll(
    @Headers() { 'accept-language': locale },
    @Query('_id') _id?: Types.ObjectId[]
  ): Promise<Pick<LeatherColorEntity, '_id' | 'title' | 'photo'>[]> {
    const colors = await this.leatherColorsService.findAll(
      _id ? { $or: _id.map(_id => ({ _id })) } : undefined
    )

    return colors.map(({ title, _id, photo }) => ({ title: title[locale], _id, photo }))
  }

  @Get(':id') // TODO написать возвращаемый тип для swagger
  async findOne(
    @Param('id') id: Types.ObjectId,
    @Headers() { 'accept-language': locale }
  ): Promise<
    Omit<LeatherColorEntity, 'article'> & {
      article: Pick<LeatherArticleEntity, '_id' | 'title'>
    }
  > {
    const { article, _id, photo, description, title, value, code } =
      await this.leatherColorsService.findOne(id)

    const { title: articleTitle } = await this.leatherArticlesService.findOne(article)

    return {
      _id,
      photo,
      code,
      value,
      title: title[locale],
      description: description[locale],
      article: { _id: article, title: articleTitle[locale] },
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() { ...updateLeatherColorDto }: Partial<LeatherColorResponse>,
    @Headers() { 'accept-language': locale }: { 'accept-language': 'ru' | 'en' }
  ): Promise<{
    _id: Types.ObjectId
    value: string
    code: string
    photo: string
    title: string
    description: string
    article: { _id: Types.ObjectId; title: string }
  }> {
    const { description, title } = await this.leatherColorsService.findOne(id)

    const {
      article,
      _id,
      title: { [locale]: newTitle },
      description: { [locale]: newDescription },
      value,
      code,
      photo,
    } = await this.leatherColorsService.update(id, {
      ...updateLeatherColorDto,
      title: updateLeatherColorDto.title && { ...title, [locale]: updateLeatherColorDto.title },
      description: updateLeatherColorDto.description && {
        ...description,
        [locale]: updateLeatherColorDto.description,
      },
    })

    const { title: articleTitle } = await this.leatherArticlesService.findOne(article)

    return {
      _id,
      value,
      code,
      photo,
      title: newTitle,
      description: newDescription,
      article: { _id: article, title: articleTitle[locale] },
    }
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
}
