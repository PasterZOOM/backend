import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, ProjectionType, Types } from 'mongoose'

import { CreateLeatherFactoryDto } from './dto/create-leather-factory.dto'
import { UpdateLeatherFactoryDto } from './dto/update-leather-factory.dto'
import { LeatherFactoryAlias, LeatherFactoryDocument } from './schemas/leather-factory.schema'

@Injectable()
export class LeatherFactoriesService {
  constructor(
    @InjectModel(LeatherFactoryAlias) private LeatherFactoryModel: Model<LeatherFactoryDocument>
  ) {}

  async create(createLeatherFactoryDto: CreateLeatherFactoryDto): Promise<LeatherFactoryDocument> {
    const newLeatherFactory = new this.LeatherFactoryModel(createLeatherFactoryDto)

    return newLeatherFactory.save()
  }

  async findAll(
    filters: FilterQuery<LeatherFactoryDocument> = {},
    projection: ProjectionType<LeatherFactoryDocument> = undefined
  ): Promise<LeatherFactoryDocument[]> {
    return this.LeatherFactoryModel.find(filters, projection).sort().exec()
  }

  async findOne(
    id: Types.ObjectId,
    projection: ProjectionType<LeatherFactoryDocument> = undefined
  ): Promise<LeatherFactoryDocument> {
    return this.LeatherFactoryModel.findById(id, projection)
  }

  async update(
    id: Types.ObjectId,
    updateLeatherFactoryDto: UpdateLeatherFactoryDto
  ): Promise<LeatherFactoryDocument> {
    await this.LeatherFactoryModel.findByIdAndUpdate(id, updateLeatherFactoryDto)

    return this.findOne(id)
  }

  async remove(id: Types.ObjectId): Promise<LeatherFactoryDocument> {
    return this.LeatherFactoryModel.findByIdAndRemove(id)
  }
}
