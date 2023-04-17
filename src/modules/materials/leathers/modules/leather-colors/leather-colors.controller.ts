import {
  Body,
  Controller,
  Delete,
  forwardRef,
  Get,
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

import { LeatherArticlesService } from '../leather-articles/leather-articles.service'

import { CreateLeatherColorDto } from './dto/create-leather-color.dto'
import { UpdateLeatherColorDto } from './dto/update-leather-color.dto'
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
    @Body() createLeatherColorDto: CreateLeatherColorDto,
    @Param('articleId') articleId: Types.ObjectId
  ): Promise<LeatherColorEntity> {
    try {
      const createdColor = await this.leatherColorsService.create({
        ...createLeatherColorDto,
        article: articleId,
      })

      await this.leatherArticlesService.push(articleId, { colors: createdColor._id })

      return createdColor
    } catch (e) {
      throw new BadIdException('factory', e)
    }
  }

  @Get()
  @ApiQuery({ name: '_id', required: false })
  async findAll(
    @Query('_id') _id?: Types.ObjectId[]
  ): Promise<Pick<LeatherColorEntity, '_id' | 'title' | 'photo'>[]> {
    const colors = await this.leatherColorsService.findAll(
      _id ? { $or: _id.map(_id => ({ _id })) } : undefined
    )

    return colors.map(({ title, _id, photo }) => ({ title, _id, photo }))
  }

  @Get(':id') // TODO написать возвращаемый тип для swagger
  async findOne(@Param('id') id: Types.ObjectId): Promise<
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
      title,
      description,
      article: { _id: article, title: articleTitle },
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() updateLeatherColorDto: UpdateLeatherColorDto
  ): Promise<
    Omit<LeatherColorEntity, 'article'> & { article: Pick<LeatherArticleEntity, '_id' | 'title'> }
  > {
    const { article, _id, description, title, value, code, photo } =
      await this.leatherColorsService.update(id, updateLeatherColorDto)

    const { title: articleTitle } = await this.leatherArticlesService.findOne(article)

    return {
      _id,
      description,
      title,
      value,
      code,
      photo,
      article: { _id: article, title: articleTitle },
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId): Promise<LeatherColorEntity> {
    try {
      const color = await this.leatherColorsService.findOne(id)
      const article = await this.leatherArticlesService.findOne(color.article)

      if (article) {
        await this.leatherArticlesService.pull(article._id, { colors: id })
      }

      return this.leatherColorsService.remove(id)
    } catch (e) {
      throw new BadIdException('address', e)
    }
  }
}
