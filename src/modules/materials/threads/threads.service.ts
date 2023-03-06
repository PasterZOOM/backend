import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateThreadDto } from './dto/create-thread.dto'
import { UpdateThreadDto } from './dto/update-thread.dto'
import { ThreadEntity } from './entities/thread.entity'
import { ThreadAlias, ThreadDocument } from './schemas/thread.schema'

@Injectable()
export class ThreadsService {
  constructor(@InjectModel(ThreadAlias) private ThreadModel: Model<ThreadDocument>) {}

  async create(createThreadDto: CreateThreadDto): Promise<ThreadEntity> {
    const newThread = new this.ThreadModel(createThreadDto)

    return newThread.save()
  }

  async findAll(): Promise<ThreadEntity[]> {
    return this.ThreadModel.find().exec()
  }

  async findOne(id: string): Promise<ThreadEntity> {
    return this.ThreadModel.findById(id)
  }

  async update(id: string, updateThreadDto: UpdateThreadDto): Promise<ThreadEntity> {
    await this.ThreadModel.findByIdAndUpdate(id, updateThreadDto)

    return this.findOne(id)
  }

  async remove(id: string): Promise<ThreadEntity> {
    return this.ThreadModel.findByIdAndRemove(id)
  }
}
