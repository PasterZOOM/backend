import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateLeatherDto } from './dto/create-leather.dto'
import { UpdateLeatherDto } from './dto/update-leather.dto'
import { ILeather } from './interfaces/leather.interface'
import { Leather, LeatherDocument } from './schemas/leather.schema'

@Injectable()
export class LeathersService {
  constructor(@InjectModel(Leather.name) private LeatherModel: Model<LeatherDocument>) {}

  async create(createLeatherDto: CreateLeatherDto): Promise<ILeather> {
    const newThread = new this.LeatherModel(createLeatherDto)

    return newThread.save()
  }

  async findAll(): Promise<ILeather[]> {
    return this.LeatherModel.find().exec()
  }

  async findOne(id: string): Promise<ILeather> {
    return this.LeatherModel.findById(id)
  }

  async update(id: string, updateLeatherDto: UpdateLeatherDto): Promise<ILeather> {
    return this.LeatherModel.findByIdAndUpdate(id, updateLeatherDto)
  }

  async remove(id: string): Promise<ILeather> {
    return this.LeatherModel.findByIdAndRemove(id)
  }
}
