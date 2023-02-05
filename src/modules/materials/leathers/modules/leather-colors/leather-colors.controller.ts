import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common'
import { BadIdException } from 'src/common/exceptions/badId.Exceptions'
import { LeatherArticlesService } from 'src/modules/materials/leathers/modules/leather-articles/leather-articles.service'

import { CreateLeatherColorDto } from './dto/create-leather-color.dto'
import { UpdateLeatherColorDto } from './dto/update-leather-color.dto'
import { ILeatherColor } from './interfaces/leather-color.interface'
import { LeatherColorsService } from './leather-colors.service'

@Controller('leather-colors')
export class LeatherColorsController {
  constructor(
    private readonly leatherColorsService: LeatherColorsService,
    private readonly leatherArticlesService: LeatherArticlesService
  ) {}

  @Post(':articleId')
  async create(
    @Body() createLeatherColorDto: Omit<CreateLeatherColorDto, 'article'>,
    @Param('articleId') articleId: string
  ): Promise<ILeatherColor> {
    try {
      const article = await this.leatherArticlesService.findOne(articleId)

      const createdColor = await this.leatherColorsService.create({
        ...createLeatherColorDto,
        article: articleId,
      })

      await this.leatherArticlesService.push(article._id, { colors: createdColor._id })

      return createdColor
    } catch (e) {
      throw new BadIdException('factory', e)
    }
  }

  @Get()
  async findAll(): Promise<ILeatherColor[]> {
    return this.leatherColorsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ILeatherColor> {
    return this.leatherColorsService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLeatherColorDto: UpdateLeatherColorDto
  ): Promise<ILeatherColor> {
    return this.leatherColorsService.update(id, updateLeatherColorDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ILeatherColor> {
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
