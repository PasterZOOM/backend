import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateLeatherDto } from './dto/create-leather.dto'
import { UpdateLeatherDto } from './dto/update-leather.dto'
import { LeatherEntity } from './entities/leather.entity'
import { LeatherAlias, LeatherDocument } from './schemas/leather.schema'

@Injectable()
export class LeathersService {
  constructor(@InjectModel(LeatherAlias) private LeatherModel: Model<LeatherDocument>) {}

  async create(createLeatherDto: CreateLeatherDto): Promise<LeatherEntity> {
    const newThread = new this.LeatherModel(createLeatherDto)

    return newThread.save()
  }

  async findAll(): Promise<LeatherEntity[]> {
    return this.LeatherModel.find().exec()
  }

  async findOne(id: string): Promise<LeatherEntity> {
    return this.LeatherModel.findById(id)
  }

  async update(id: string, updateLeatherDto: UpdateLeatherDto): Promise<LeatherEntity> {
    return this.LeatherModel.findByIdAndUpdate(id, updateLeatherDto)
  }

  async remove(id: string): Promise<LeatherEntity> {
    return this.LeatherModel.findByIdAndRemove(id)
  }
}
