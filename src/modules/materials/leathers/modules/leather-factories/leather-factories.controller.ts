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
import { Promise } from 'mongoose'
import { LeatherArticleEntity } from 'src/modules/materials/leathers/modules/leather-articles/entities/leather-article.entity'
import { LeatherArticlesService } from 'src/modules/materials/leathers/modules/leather-articles/leather-articles.service'
import { LeatherColorsService } from 'src/modules/materials/leathers/modules/leather-colors/leather-colors.service'

import { CreateLeatherFactoryDto } from './dto/create-leather-factory.dto'
import { UpdateLeatherFactoryDto } from './dto/update-leather-factory.dto'
import { LeatherFactoryEntity } from './entities/leather-factory.entity'
import { LeatherFactoriesService } from './leather-factories.service'

@ApiTags('Leather-factories')
@Controller('leather-factories')
export class LeatherFactoriesController {
  constructor(
    @Inject(forwardRef(() => LeatherColorsService))
    private readonly leatherColorService: LeatherColorsService,
    private readonly leatherFactoriesService: LeatherFactoriesService,
    @Inject(forwardRef(() => LeatherArticlesService))
    private readonly leatherArticlesService: LeatherArticlesService
  ) {}

  @Post()
  async create(@Body() createFactoryDto: CreateLeatherFactoryDto): Promise<LeatherFactoryEntity> {
    return this.leatherFactoriesService.create(createFactoryDto)
  }

  @Get()
  @ApiOkResponse({
    type: [PickType(LeatherFactoryEntity, ['_id', 'name'])],
  })
  async findAll(): Promise<Pick<LeatherFactoryEntity, '_id' | 'name'>[]> {
    const factories = await this.leatherFactoriesService.findAll()

    return factories.map(({ name, _id }) => ({ name, _id }))
  }

  @Get(':id') // TODO написать возвращаемый тип для swagger
  async findOne(@Param('id') id: string): Promise<
    Omit<LeatherFactoryEntity, 'articles'> & {
      articles: Pick<LeatherArticleEntity, '_id' | 'name'>[]
    }
  > {
    const { articles, _id, description, country, name } =
      await this.leatherFactoriesService.findOne(id)

    return {
      _id,
      description,
      country,
      name,
      articles: await Promise.all(
        articles.map(async articleId => {
          const { _id, name } = await this.leatherArticlesService.findOne(articleId)

          return { _id, name }
        })
      ),
    }
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateFactoryDto: UpdateLeatherFactoryDto
  ): Promise<
    Omit<LeatherFactoryEntity, 'articles'> & {
      articles: Pick<LeatherArticleEntity, '_id' | 'name'>[]
    }
  > {
    const { articles, _id, description, country, name } = await this.leatherFactoriesService.update(
      id,
      updateFactoryDto
    )

    return {
      _id,
      country,
      description,
      name,
      articles: await Promise.all(
        articles.map(async articleId => {
          const { _id, name } = await this.leatherArticlesService.findOne(articleId)

          return { _id, name }
        })
      ),
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<LeatherFactoryEntity> {
    const factory = await this.leatherFactoriesService.findOne(id)

    await Promise.all(
      factory.articles.map(async article => {
        const { colors } = await this.leatherArticlesService.findOne(article)

        await Promise.all(colors.map(color => this.leatherColorService.remove(color)))

        return this.leatherArticlesService.remove(article)
      })
    )

    return this.leatherFactoriesService.remove(id)
  }
}
