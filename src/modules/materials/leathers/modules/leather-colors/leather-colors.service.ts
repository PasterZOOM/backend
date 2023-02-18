import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateLeatherColorDto } from './dto/create-leather-color.dto'
import { UpdateLeatherColorDto } from './dto/update-leather-color.dto'
import { LeatherColorEntity } from './entities/leather-color.entity'
import { LeatherColor, LeatherColorDocument } from './schemas/leather-color.schema'

@Injectable()
export class LeatherColorsService {
  constructor(
    @InjectModel(LeatherColor.name) private LeatherColorsModel: Model<LeatherColorDocument>
  ) {}

  async create(
    createLeatherColorDto: CreateLeatherColorDto & { article: string }
  ): Promise<LeatherColorEntity> {
    const newLeatherColor = new this.LeatherColorsModel(createLeatherColorDto)

    return newLeatherColor.save()
  }

  async findAll(): Promise<LeatherColorEntity[]> {
    return this.LeatherColorsModel.find().sort().exec()
  }

  async findOne(id: string): Promise<LeatherColorEntity> {
    return this.LeatherColorsModel.findById(id)
  }

  async update(
    id: string,
    updateLeatherColorDto: UpdateLeatherColorDto
  ): Promise<LeatherColorEntity> {
    return this.LeatherColorsModel.findByIdAndUpdate(id, updateLeatherColorDto)
  }

  async remove(id: string): Promise<LeatherColorEntity> {
    return this.LeatherColorsModel.findByIdAndRemove(id)
  }
}
