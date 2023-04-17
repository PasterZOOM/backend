import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

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

  async findOne(id: Types.ObjectId): Promise<LeatherEntity> {
    return this.LeatherModel.findById(id)
  }

  async update(id: Types.ObjectId, updateLeatherDto: UpdateLeatherDto): Promise<LeatherEntity> {
    await this.LeatherModel.findByIdAndUpdate(id, updateLeatherDto)

    return this.findOne(id)
  }

  async remove(id: Types.ObjectId): Promise<LeatherEntity> {
    return this.LeatherModel.findByIdAndRemove(id)
  }
}
