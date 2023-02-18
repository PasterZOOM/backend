import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateLeatherFactoryDto } from './dto/create-leather-factory.dto'
import { UpdateLeatherFactoryDto } from './dto/update-leather-factory.dto'
import { LeatherFactoryEntity } from './entities/leather-factory.entity'
import { LeatherFactoryAlias, LeatherFactoryDocument } from './schemas/leather-factory.schema'

@Injectable()
export class LeatherFactoriesService {
  constructor(
    @InjectModel(LeatherFactoryAlias) private LeatherFactoryModel: Model<LeatherFactoryDocument>
  ) {}

  async create(createLeatherFactoryDto: CreateLeatherFactoryDto): Promise<LeatherFactoryEntity> {
    const newLeatherFactory = new this.LeatherFactoryModel(createLeatherFactoryDto)

    return newLeatherFactory.save()
  }

  async findAll(): Promise<LeatherFactoryEntity[]> {
    return this.LeatherFactoryModel.find().sort().exec()
  }

  async findOne(id: string): Promise<LeatherFactoryEntity> {
    return this.LeatherFactoryModel.findById(id)
  }

  async update(
    id: string,
    updateLeatherFactoryDto: UpdateLeatherFactoryDto
  ): Promise<LeatherFactoryEntity> {
    return this.LeatherFactoryModel.findByIdAndUpdate(id, updateLeatherFactoryDto)
  }

  async remove(id: string): Promise<LeatherFactoryEntity> {
    return this.LeatherFactoryModel.findByIdAndRemove(id)
  }

  async push(
    id: string,
    addToSet: { [key in keyof Partial<Pick<LeatherFactoryEntity, 'articles'>>]: string }
  ): Promise<LeatherFactoryEntity> {
    return this.LeatherFactoryModel.findByIdAndUpdate(id, { $addToSet: addToSet })
  }

  async pull(
    id: string,
    pulled: { [key in keyof Partial<Pick<LeatherFactoryEntity, 'articles'>>]: string }
  ): Promise<LeatherFactoryEntity> {
    return this.LeatherFactoryModel.findByIdAndUpdate(id, { $pull: pulled })
  }
}
