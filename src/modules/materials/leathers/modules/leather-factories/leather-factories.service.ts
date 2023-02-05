import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateLeatherFactoryDto } from './dto/create-leather-factory.dto'
import { UpdateLeatherFactoryDto } from './dto/update-leather-factory.dto'
import { ILeatherFactory } from './interfaces/leather-factory.interface'
import { LeatherFactory, LeatherFactoryDocument } from './schemas/leather-factory.schema'

@Injectable()
export class LeatherFactoriesService {
  constructor(
    @InjectModel(LeatherFactory.name) private LeatherFactoryModel: Model<LeatherFactoryDocument>
  ) {}

  async create(createLeatherFactoryDto: CreateLeatherFactoryDto): Promise<ILeatherFactory> {
    const newLeatherFactory = new this.LeatherFactoryModel(createLeatherFactoryDto)

    return newLeatherFactory.save()
  }

  async findAll(): Promise<ILeatherFactory[]> {
    return this.LeatherFactoryModel.find().sort().exec()
  }

  async findOne(id: string): Promise<ILeatherFactory> {
    return this.LeatherFactoryModel.findById(id)
  }

  async update(
    id: string,
    updateLeatherFactoryDto: UpdateLeatherFactoryDto
  ): Promise<ILeatherFactory> {
    return this.LeatherFactoryModel.findByIdAndUpdate(id, updateLeatherFactoryDto)
  }

  async remove(id: string): Promise<ILeatherFactory> {
    return this.LeatherFactoryModel.findByIdAndRemove(id)
  }

  async push(
    id: string,
    addToSet: { [key in keyof Partial<Pick<ILeatherFactory, 'articles'>>]: string }
  ): Promise<ILeatherFactory> {
    return this.LeatherFactoryModel.findByIdAndUpdate(id, { $addToSet: addToSet })
  }

  async pull(
    id: string,
    pulled: { [key in keyof Partial<Pick<ILeatherFactory, 'articles'>>]: string }
  ): Promise<ILeatherFactory> {
    return this.LeatherFactoryModel.findByIdAndUpdate(id, { $pull: pulled })
  }
}
