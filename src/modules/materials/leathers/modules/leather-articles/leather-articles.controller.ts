import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { FilterQuery } from 'mongoose'
import { BadIdException } from 'src/common/exceptions/badId.Exceptions'

import { LeatherFactoriesService } from '../leather-factories/leather-factories.service'

import { CreateLeatherArticleDto } from './dto/create-leather-article.dto'
import { UpdateLeatherArticleDto } from './dto/update-leather-article.dto'
import { LeatherArticleEntity } from './entities/leather-article.entity'
import { LeatherArticlesService } from './leather-articles.service'

@ApiTags('Leather-articles')
@Controller('leather-articles')
export class LeatherArticlesController {
  constructor(
    private readonly leatherArticlesService: LeatherArticlesService,
    private readonly leatherFactoriesService: LeatherFactoriesService
  ) {}

  @Post(':factoryId')
  async create(
    @Body() createLeatherArticleDto: CreateLeatherArticleDto,
    @Param('factoryId') factoryId: string
  ): Promise<LeatherArticleEntity> {
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
  async findAll(filter: FilterQuery<LeatherArticleEntity>): Promise<LeatherArticleEntity[]> {
    return this.leatherArticlesService.findAll(filter)
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<LeatherArticleEntity> {
    return this.leatherArticlesService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLeatherArticleDto: UpdateLeatherArticleDto
  ): Promise<LeatherArticleEntity> {
    await this.leatherArticlesService.update(id, updateLeatherArticleDto)

    return this.findOne(id)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<LeatherArticleEntity> {
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
