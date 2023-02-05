import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model } from 'mongoose'

import { CreateLeatherArticleDto } from './dto/create-leather-article.dto'
import { UpdateLeatherArticleDto } from './dto/update-leather-article.dto'
import { ILeatherArticle } from './interfaces/leather-article.interface'
import { LeatherArticle, LeatherArticleDocument } from './schemas/leather-article.schema'

@Injectable()
export class LeatherArticlesService {
  constructor(
    @InjectModel(LeatherArticle.name) private LeatherArticleModel: Model<LeatherArticleDocument>
  ) {}

  async create(createLeatherArticleDto: CreateLeatherArticleDto): Promise<ILeatherArticle> {
    const newLeatherArticle = new this.LeatherArticleModel(createLeatherArticleDto)

    return newLeatherArticle.save()
  }

  async findAll(filter: FilterQuery<ILeatherArticle>): Promise<ILeatherArticle[]> {
    return this.LeatherArticleModel.find(filter).exec()
  }

  async findOne(id: string): Promise<ILeatherArticle> {
    return this.LeatherArticleModel.findById(id)
  }

  async update(
    id: string,
    updateLeatherArticleDto: UpdateLeatherArticleDto
  ): Promise<ILeatherArticle> {
    return this.LeatherArticleModel.findByIdAndUpdate(id, updateLeatherArticleDto)
  }

  async remove(id: string): Promise<ILeatherArticle> {
    return this.LeatherArticleModel.findByIdAndRemove(id)
  }

  async push(
    id: string,
    addToSet: { [key in keyof Partial<Pick<ILeatherArticle, 'colors'>>]: string }
  ): Promise<ILeatherArticle> {
    return this.LeatherArticleModel.findByIdAndUpdate(id, { $addToSet: addToSet })
  }

  async pull(
    id: string,
    pulled: { [key in keyof Partial<Pick<ILeatherArticle, 'colors'>>]: string }
  ): Promise<ILeatherArticle> {
    return this.LeatherArticleModel.findByIdAndUpdate(id, { $pull: pulled })
  }
}
