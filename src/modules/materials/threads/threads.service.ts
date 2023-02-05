import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateThreadDto } from './dto/create-thread.dto'
import { UpdateThreadDto } from './dto/update-thread.dto'
import { IThread } from './interfaces/thread.interface'
import { Thread, ThreadDocument } from './schemas/thread.schema'

@Injectable()
export class ThreadsService {
  constructor(@InjectModel(Thread.name) private ThreadModel: Model<ThreadDocument>) {}

  async create(createThreadDto: CreateThreadDto): Promise<IThread> {
    const newThread = new this.ThreadModel(createThreadDto)

    return newThread.save()
  }

  async findAll(): Promise<IThread[]> {
    return this.ThreadModel.find().exec()
  }

  async findOne(id: string): Promise<IThread> {
    return this.ThreadModel.findById(id)
  }

  async update(id: string, updateThreadDto: UpdateThreadDto): Promise<IThread> {
    return this.ThreadModel.findByIdAndUpdate(id, updateThreadDto)
  }

  async remove(id: string): Promise<IThread> {
    return this.ThreadModel.findByIdAndRemove(id)
  }
}
