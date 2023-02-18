import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { BadIdException } from 'src/common/exceptions/badId.Exceptions'

import { CreateLeatherDto } from './dto/create-leather.dto'
import { UpdateLeatherDto } from './dto/update-leather.dto'
import { LeatherEntity } from './entities/leather.entity'
import { LeathersService } from './leathers.service'
import { LeatherArticlesService } from './modules/leather-articles/leather-articles.service'
import { LeatherColorsService } from './modules/leather-colors/leather-colors.service'
import { LeatherFactoriesService } from './modules/leather-factories/leather-factories.service'

@ApiTags('Leathers')
@Controller('leathers')
export class LeathersController {
  constructor(
    private readonly leathersService: LeathersService,
    private readonly leatherFactoriesService: LeatherFactoriesService,
    private readonly leatherArticlesService: LeatherArticlesService,
    private readonly leatherColorsService: LeatherColorsService
  ) {}

  @Post()
  async create(@Body() createLeatherDto: CreateLeatherDto): Promise<LeatherEntity> {
    try {
      const factory = await this.leatherFactoriesService.findOne(createLeatherDto.factory)

      const { articles } = factory
      const hasArticle = articles.some(article => article === createLeatherDto.article)

      if (hasArticle) {
        try {
          const article = await this.leatherArticlesService.findOne(createLeatherDto.article)
          const { colors } = article
          const hasColor = colors.some(color => color === createLeatherDto.color)

          if (hasColor) {
            const color = await this.leatherColorsService.findOne(createLeatherDto.color)

            if (color) return this.leathersService.create(createLeatherDto)

            throw new BadIdException('color', new Error())
          }
          throw new BadRequestException('There is no such color in the article', {
            cause: new Error(),
            description: 'There is no such color in the article',
          })
        } catch (e) {
          throw new BadIdException('article', e)
        }
      } else {
        throw new BadRequestException('Factories do not produce such an article', {
          cause: new Error(),
          description: 'Factories do not produce such an article',
        })
      }
    } catch (e) {
      throw new BadIdException('factory', e)
    }
  }

  @Get()
  findAll(): Promise<LeatherEntity[]> {
    return this.leathersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<LeatherEntity> {
    return this.leathersService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateLeatherDto: UpdateLeatherDto
  ): Promise<LeatherEntity> {
    await this.leathersService.update(id, updateLeatherDto)

    return this.findOne(id)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<LeatherEntity> {
    return this.leathersService.remove(id)
  }
}
