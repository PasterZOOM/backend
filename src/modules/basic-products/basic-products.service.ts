import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, Types } from 'mongoose'

import { CreateBasicProductDto } from './dto/create-basic-product.dto'
import { UpdateBasicProductDto } from './dto/update-basic-product.dto'
import { BasicProductEntity } from './entities/basic-product.entity'
import { BasicProductAlias, BasicProductDocument } from './schemas/basic-product.schema'

@Injectable()
export class BasicProductsService {
  constructor(
    @InjectModel(BasicProductAlias) private BasicProductModel: Model<BasicProductDocument>
  ) {}

  async create(createBasicProductDto: CreateBasicProductDto): Promise<BasicProductEntity> {
    const newPerson = new this.BasicProductModel(createBasicProductDto)

    return newPerson.save()
  }

  async findAll(filters?: FilterQuery<BasicProductDocument>): Promise<BasicProductEntity[]> {
    return this.BasicProductModel.find(filters)
  }

  async findOne(id: Types.ObjectId): Promise<BasicProductEntity> {
    return this.BasicProductModel.findById(id)
  }

  async update(
    id: Types.ObjectId,
    updateBasicProductDto: UpdateBasicProductDto
  ): Promise<BasicProductEntity> {
    await this.BasicProductModel.findByIdAndUpdate(id, updateBasicProductDto)

    return this.findOne(id)
  }

  async remove(id: Types.ObjectId): Promise<BasicProductEntity> {
    return this.BasicProductModel.findByIdAndRemove(id)
  }
}
