import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, Types } from 'mongoose'

import { CreateBasicProductDto } from './dto/create-basic-product.dto'
import { UpdateBasicProductDto } from './dto/update-basic-product.dto'
import { BasicProductAlias, BasicProductDocument } from './schemas/basic-product.schema'

const DEFAULT_LIMIT = 9

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
    limit = DEFAULT_LIMIT,
    skip = 0
  ): Promise<BasicProductDocument[]> {
    return this.BasicProductModel.find(filters).limit(+limit).skip(+skip)
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

  async countDocuments(filters?: FilterQuery<BasicProductDocument>): Promise<number> {
    return this.BasicProductModel.countDocuments(filters).exec()
  }
}
