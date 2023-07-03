import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, Types } from 'mongoose'

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
    createLeatherArticleDto: CreateLeatherArticleDto & { factory: Types.ObjectId }
  ): Promise<LeatherArticleDocument> {
    const newLeatherArticle = new this.LeatherArticleModel(createLeatherArticleDto)

    return newLeatherArticle.save()
  }

  async findAll(filters?: FilterQuery<LeatherArticleDocument>): Promise<LeatherArticleDocument[]> {
    return this.LeatherArticleModel.find(filters).sort().exec()
  }

  async findOne(id: Types.ObjectId): Promise<LeatherArticleDocument> {
    return this.LeatherArticleModel.findById(id)
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

  async push(
    id: Types.ObjectId,
    addToSet: { [key in keyof Partial<Pick<LeatherArticleEntity, 'colors'>>]: Types.ObjectId }
  ): Promise<LeatherArticleDocument> {
    await this.LeatherArticleModel.findByIdAndUpdate(id, { $addToSet: addToSet })

    return this.findOne(id)
  }

  async pull(
    id: Types.ObjectId,
    pulled: { [key in keyof Partial<Pick<LeatherArticleEntity, 'colors'>>]: Types.ObjectId }
  ): Promise<LeatherArticleDocument> {
    return this.LeatherArticleModel.findByIdAndUpdate(id, { $pull: pulled })
  }
}
