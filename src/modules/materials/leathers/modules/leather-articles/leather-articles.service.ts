import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, ProjectionType, Types } from 'mongoose'

import { CreateLeatherArticleDto } from './dto/create-leather-article.dto'
import { UpdateLeatherArticleDto } from './dto/update-leather-article.dto'
import { LeatherArticleAlias, LeatherArticleDocument } from './schemas/leather-article.schema'

@Injectable()
export class LeatherArticlesService {
  constructor(
    @InjectModel(LeatherArticleAlias) private LeatherArticleModel: Model<LeatherArticleDocument>
  ) {}

  async create(
    createLeatherArticleDto: CreateLeatherArticleDto & { factory: Types.ObjectId }
  ): Promise<LeatherArticleDocument> {
    const newLeatherArticle = new this.LeatherArticleModel(createLeatherArticleDto)

    return newLeatherArticle.save()
  }

  async findAll(
    filters: FilterQuery<LeatherArticleDocument> = {},
    projection: ProjectionType<LeatherArticleDocument> = undefined
  ): Promise<LeatherArticleDocument[]> {
    return this.LeatherArticleModel.find(filters, projection).sort().exec()
  }

  async findOne(
    id: Types.ObjectId,
    projection: ProjectionType<LeatherArticleDocument> = undefined
  ): Promise<LeatherArticleDocument> {
    return this.LeatherArticleModel.findById(id, projection)
  }

  async find(filter: FilterQuery<LeatherArticleDocument>): Promise<LeatherArticleDocument> {
    return this.LeatherArticleModel.findOne(filter)
  }

  async update(
    id: Types.ObjectId,
    updateLeatherArticleDto: UpdateLeatherArticleDto
  ): Promise<LeatherArticleDocument> {
    await this.LeatherArticleModel.findByIdAndUpdate(id, updateLeatherArticleDto)

    return this.findOne(id)
  }

  async remove(id: Types.ObjectId): Promise<LeatherArticleDocument> {
    return this.LeatherArticleModel.findByIdAndRemove(id)
  }

  async deleteMany(filter: FilterQuery<LeatherArticleDocument>): Promise<boolean> {
    await this.LeatherArticleModel.deleteMany(filter)

    return true
  }
}
