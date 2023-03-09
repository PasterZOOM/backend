import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateBasicProductDto } from './dto/create-basic-product.dto'
import { UpdateBasicProductDto } from './dto/update-basic-product.dto'
import { BasicProductEntity } from './entities/basic-product.entity'
import { EFilterKeys } from './entities/basic-product.type'
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

  async findAll(
    filters: Partial<Record<EFilterKeys, string[] | undefined>>
  ): Promise<BasicProductEntity[]> {
    let categories = []
    let leathers = []

    if (filters.categories) {
      categories = filters.categories.map(category => ({ category }))
    }
    if (filters.leathers) {
      leathers = filters.leathers.map(leather => ({ leather }))
    }

    return this.BasicProductModel.find({
      $and: [
        categories.length ? { $or: categories } : {},
        leathers.length ? { $or: leathers } : {},
      ],
    })
  }

  async findOne(id: string): Promise<BasicProductEntity> {
    return this.BasicProductModel.findById(id)
  }

  async update(
    id: string,
    updateBasicProductDto: UpdateBasicProductDto
  ): Promise<BasicProductEntity> {
    await this.BasicProductModel.findByIdAndUpdate(id, updateBasicProductDto)

    return this.findOne(id)
  }

  async remove(id: string): Promise<BasicProductEntity> {
    return this.BasicProductModel.findByIdAndRemove(id)
  }
}
