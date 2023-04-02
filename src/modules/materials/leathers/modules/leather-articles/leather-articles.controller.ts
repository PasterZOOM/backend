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
} from '@nestjs/common'
import { ApiOkResponse, ApiTags, PickType } from '@nestjs/swagger'
import { FilterQuery } from 'mongoose'
import { BadIdException } from 'src/common/exceptions/badId.Exceptions'
import { LeatherColorEntity } from 'src/modules/materials/leathers/modules/leather-colors/entities/leather-color.entity'
import { LeatherFactoryEntity } from 'src/modules/materials/leathers/modules/leather-factories/entities/leather-factory.entity'

import { LeatherColorsService } from '../leather-colors/leather-colors.service'
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
    @Inject(forwardRef(() => LeatherColorsService))
    private readonly leatherColorService: LeatherColorsService,
    @Inject(forwardRef(() => LeatherFactoriesService))
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
  @ApiOkResponse({
    type: [PickType(LeatherArticleEntity, ['_id', 'name'])],
  })
  async findAll(
    filter: FilterQuery<LeatherArticleEntity>
  ): Promise<Pick<LeatherArticleEntity, '_id' | 'name'>[]> {
    const articles = await this.leatherArticlesService.findAll(filter)

    return articles.map(({ name, _id }) => ({ name, _id }))
  }

  @Get(':id') // TODO написать возвращаемый тип для swagger
  async findOne(@Param('id') id: string): Promise<
    Omit<LeatherArticleEntity, 'colors' | 'factory'> & {
      colors: Pick<LeatherColorEntity, '_id' | 'title'>[]
      factory: Pick<LeatherFactoryEntity, '_id' | 'name'>
    }
  > {
    const { _id, description, factory, name, colors } = await this.leatherArticlesService.findOne(
      id
    )
    const { name: factoryName } = await this.leatherFactoriesService.findOne(factory)

    return {
      _id,
      description,
      name,
      factory: { _id: factory, name: factoryName },
      colors: await Promise.all(
        colors.map(async colorId => {
          const { _id, title } = await this.leatherColorService.findOne(colorId)

          return { _id, title }
        })
      ),
    }
  }

  @Patch(':id') // TODO сделать возможность изменять фабрику для артикула (так же реализовать это на фронте)
  async update(
    @Param('id') id: string,
    @Body() updateLeatherArticleDto: UpdateLeatherArticleDto
  ): Promise<
    Omit<LeatherArticleEntity, 'colors' | 'factory'> & {
      colors: Pick<LeatherColorEntity, '_id' | 'title'>[]
      factory: Pick<LeatherFactoryEntity, '_id' | 'name'>
    }
  > {
    const { _id, name, colors, description, factory } = await this.leatherArticlesService.update(
      id,
      updateLeatherArticleDto
    )

    const { name: factoryName } = await this.leatherFactoriesService.findOne(factory)

    return {
      _id,
      description,
      name,
      factory: { _id: factory, name: factoryName },
      colors: await Promise.all(
        colors.map(async colorId => {
          const { _id, title } = await this.leatherColorService.findOne(colorId)

          return { _id, title }
        })
      ),
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<LeatherArticleEntity> {
    try {
      const article = await this.leatherArticlesService.findOne(id)
      const factory = await this.leatherFactoriesService.findOne(article.factory)

      if (factory) {
        await this.leatherFactoriesService.pull(factory._id, { articles: id })
      }
      await Promise.all(article.colors.map(color => this.leatherColorService.remove(color)))

      return this.leatherArticlesService.remove(id)
    } catch (e) {
      throw new BadIdException('address', e)
    }
  }
}
