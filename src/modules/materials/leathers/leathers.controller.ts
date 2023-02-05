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
import { BadIdException } from 'src/common/exceptions/badId.Exceptions'
import { LeatherArticlesService } from 'src/modules/materials/leathers/modules/leather-articles/leather-articles.service'
import { LeatherColorsService } from 'src/modules/materials/leathers/modules/leather-colors/leather-colors.service'
import { LeatherFactoriesService } from 'src/modules/materials/leathers/modules/leather-factories/leather-factories.service'

import { CreateLeatherDto } from './dto/create-leather.dto'
import { UpdateLeatherDto } from './dto/update-leather.dto'
import { ILeather } from './interfaces/leather.interface'
import { LeathersService } from './leathers.service'

@Controller('leathers')
export class LeathersController {
  constructor(
    private readonly leathersService: LeathersService,
    private readonly leatherFactoriesService: LeatherFactoriesService,
    private readonly leatherArticlesService: LeatherArticlesService,
    private readonly leatherColorsService: LeatherColorsService
  ) {}

  @Post()
  async create(@Body() createLeatherDto: CreateLeatherDto): Promise<ILeather> {
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
  findAll(): Promise<ILeather[]> {
    return this.leathersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<ILeather> {
    return this.leathersService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateLeatherDto: UpdateLeatherDto): Promise<ILeather> {
    return this.leathersService.update(id, updateLeatherDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<ILeather> {
    return this.leathersService.remove(id)
  }
}
