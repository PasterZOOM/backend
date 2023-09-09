import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, SortOrder, Types } from 'mongoose'
import { ESort } from 'modules/basic-products/entities/basic-product.type'

import { CreateBasicProductDto } from './dto/create-basic-product.dto'
import { UpdateBasicProductDto } from './dto/update-basic-product.dto'
import { BasicProductAlias, BasicProductDocument } from './schemas/basic-product.schema'

@Injectable()
export class BasicProductsService {
  constructor(
    @InjectModel(BasicProductAlias) private BasicProductModel: Model<BasicProductDocument>
  ) {}

  async create(createBasicProductDto: CreateBasicProductDto): Promise<BasicProductDocument> {
    return new this.BasicProductModel(createBasicProductDto).save()
  }

  async findAll(
    filters?: FilterQuery<BasicProductDocument>,
    limit = undefined,
    skip = 0,
    sort = ESort.NEW_FIRSTS
  ): Promise<BasicProductDocument[]> {
    const [key, value] = sort.toString().split('_') as [string, SortOrder]

    return this.BasicProductModel.find(filters)
      .limit(+limit)
      .skip(skip)
      .sort({ [key === 'date' ? '_id' : key]: value })
  }

  async findOne(id: Types.ObjectId): Promise<BasicProductDocument> {
    return this.BasicProductModel.findById(id)
  }

  async update(
    id: Types.ObjectId,
    updateBasicProductDto: UpdateBasicProductDto
  ): Promise<BasicProductDocument> {
    await this.BasicProductModel.findByIdAndUpdate(id, updateBasicProductDto)

    return this.findOne(id)
  }

  async remove(id: Types.ObjectId): Promise<BasicProductDocument> {
    return this.BasicProductModel.findByIdAndRemove(id)
  }

  async deleteMany(filter: FilterQuery<BasicProductDocument>): Promise<boolean> {
    await this.BasicProductModel.deleteMany(filter)

    return true
  }

  async countDocuments(filters?: FilterQuery<BasicProductDocument>): Promise<number> {
    return this.BasicProductModel.countDocuments(filters).exec()
  }

  async getMinCost(): Promise<number> {
    return (await this.BasicProductModel.find().sort({ cost: 1 }).limit(1))[0].cost
  }

  async getMaxCost(): Promise<number> {
    return (await this.BasicProductModel.find().sort({ cost: -1 }).limit(1))[0].cost
  }
}
