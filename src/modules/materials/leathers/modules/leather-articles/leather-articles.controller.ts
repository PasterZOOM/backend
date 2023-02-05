import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { FilterQuery } from 'mongoose'
import { BadIdException } from 'src/common/exceptions/badId.Exceptions'
import { LeatherFactoriesService } from 'src/modules/materials/leathers/modules/leather-factories/leather-factories.service'

import { CreateLeatherArticleDto } from './dto/create-leather-article.dto'
import { UpdateLeatherArticleDto } from './dto/update-leather-article.dto'
import { ILeatherArticle } from './interfaces/leather-article.interface'
import { LeatherArticlesService } from './leather-articles.service'

@Controller('leather-articles')
export class LeatherArticlesController {
  constructor(
    private readonly leatherArticlesService: LeatherArticlesService,
    private readonly leatherFactoriesService: LeatherFactoriesService
  ) {}

  @Post(':factoryId')
  async create(
    @Body() createLeatherArticleDto: Omit<CreateLeatherArticleDto, 'factory'>,
    @Param('factoryId') factoryId: string
  ): Promise<ILeatherArticle> {
    try {
      const factory = await this.leatherFactoriesService.findOne(factoryId)

      const createdArticle = await this.leatherArticlesService.create({
        ...createLeatherArticleDto,
        factory: factoryId,
      })

      await this.leatherFactoriesService.push(factory._id, { articles: createdArticle._id })

      return createdArticle
    } catch (e) {
      throw new BadIdException('factory', e)
    }
  }

  @Get()
  async findAll(filter: FilterQuery<ILeatherArticle>): Promise<ILeatherArticle[]> {
    return this.leatherArticlesService.findAll(filter)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ILeatherArticle> {
    return this.leatherArticlesService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLeatherArticleDto: UpdateLeatherArticleDto
  ): Promise<ILeatherArticle> {
    return this.leatherArticlesService.update(id, updateLeatherArticleDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<ILeatherArticle> {
    try {
      const article = await this.findOne(id)
      const factory = await this.leatherFactoriesService.findOne(article.factory)

      if (factory) {
        await this.leatherFactoriesService.pull(factory._id, { articles: id })
      }

      return this.leatherArticlesService.remove(id)
    } catch (e) {
      throw new BadIdException('address', e)
    }
  }
}
