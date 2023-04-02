import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'

import { CreateLeatherArticleDto } from './dto/create-leather-article.dto'
import { UpdateLeatherArticleDto } from './dto/update-leather-article.dto'
import { LeatherArticleEntity } from './entities/leather-article.entity'
import { LeatherArticleAlias, LeatherArticleDocument } from './schemas/leather-article.schema'

@Injectable()
export class LeatherArticlesService {
  constructor(
    @InjectModel(LeatherArticleAlias) private LeatherArticleModel: Model<LeatherArticleDocument>
  ) {}

  async create(
    createLeatherArticleDto: CreateLeatherArticleDto & { factory: string }
  ): Promise<LeatherArticleEntity> {
    const newLeatherArticle = new this.LeatherArticleModel(createLeatherArticleDto)

    return newLeatherArticle.save()
  }

  async findAll(
    filter: FilterQuery<LeatherArticleDocument>
  ): Promise<Pick<LeatherArticleEntity, '_id' | 'title'>[]> {
    return this.LeatherArticleModel.find(filter, { _id: 1, title: 1 }).sort().exec()
  }

  async findOne(id: string): Promise<LeatherArticleEntity> {
    return this.LeatherArticleModel.findById(id)
  }

  async find(filter: FilterQuery<LeatherArticleDocument>): Promise<LeatherArticleEntity> {
    return this.LeatherArticleModel.findOne(filter)
  }

  async update(
    id: string,
    updateLeatherArticleDto: UpdateLeatherArticleDto
  ): Promise<LeatherArticleEntity> {
    await this.LeatherArticleModel.findByIdAndUpdate(id, updateLeatherArticleDto)

    return this.findOne(id)
  }

  async remove(id: string): Promise<LeatherArticleEntity> {
    return this.LeatherArticleModel.findByIdAndRemove(id)
  }

  async push(
    id: string,
    addToSet: { [key in keyof Partial<Pick<LeatherArticleEntity, 'colors'>>]: string }
  ): Promise<LeatherArticleEntity> {
    await this.LeatherArticleModel.findByIdAndUpdate(id, { $addToSet: addToSet })

    return this.findOne(id)
  }

  async pull(
    id: string,
    pulled: { [key in keyof Partial<Pick<LeatherArticleEntity, 'colors'>>]: string }
  ): Promise<LeatherArticleEntity> {
    return this.LeatherArticleModel.findByIdAndUpdate(id, { $pull: pulled })
  }
}
