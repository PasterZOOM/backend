import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { BadIdException } from 'src/common/exceptions/badId.Exceptions'

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
    private readonly leatherArticlesService: LeatherArticlesService
  ) {}

  @Post(':articleId')
  async create(
    @Body() createLeatherColorDto: CreateLeatherColorDto,
    @Param('articleId') articleId: string
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
  async findAll(): Promise<Pick<LeatherColorEntity, '_id' | 'title'>[]> {
    const colors = await this.leatherColorsService.findAll()

    return colors.map(({ title, _id }) => ({ title, _id }))
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LeatherColorEntity> {
    return this.leatherColorsService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLeatherColorDto: UpdateLeatherColorDto
  ): Promise<LeatherColorEntity> {
    return this.leatherColorsService.update(id, updateLeatherColorDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<LeatherColorEntity> {
    try {
      const color = await this.findOne(id)
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
