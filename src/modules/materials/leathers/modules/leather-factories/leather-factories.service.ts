import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { CreateLeatherFactoryDto } from './dto/create-leather-factory.dto'
import { UpdateLeatherFactoryDto } from './dto/update-leather-factory.dto'
import { LeatherFactoryEntity } from './entities/leather-factory.entity'
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

  async findAll(): Promise<LeatherFactoryDocument[]> {
    return this.LeatherFactoryModel.find().sort().exec()
  }

  async findOne(id: Types.ObjectId): Promise<LeatherFactoryDocument> {
    return this.LeatherFactoryModel.findById(id)
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

  async push(
    id: Types.ObjectId,
    addToSet: { [key in keyof Partial<Pick<LeatherFactoryEntity, 'articles'>>]: Types.ObjectId }
  ): Promise<LeatherFactoryDocument> {
    return this.LeatherFactoryModel.findByIdAndUpdate(id, { $addToSet: addToSet })
  }

  async pull(
    id: Types.ObjectId,
    pulled: { [key in keyof Partial<Pick<LeatherFactoryEntity, 'articles'>>]: Types.ObjectId }
  ): Promise<LeatherFactoryEntity> {
    return this.LeatherFactoryModel.findByIdAndUpdate(id, { $pull: pulled })
  }
}
