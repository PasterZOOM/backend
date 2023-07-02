import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, Types } from 'mongoose'

import { CreateLeatherColorDto } from './dto/create-leather-color.dto'
import { UpdateLeatherColorDto } from './dto/update-leather-color.dto'
import { LeatherColorAlias, LeatherColorDocument } from './schemas/leather-color.schema'

@Injectable()
export class LeatherColorsService {
  constructor(
    @InjectModel(LeatherColorAlias) private LeatherColorsModel: Model<LeatherColorDocument>
  ) {}

  async create(
    createLeatherColorDto: CreateLeatherColorDto & { article: Types.ObjectId }
  ): Promise<LeatherColorDocument> {
    const newLeatherColor = new this.LeatherColorsModel(createLeatherColorDto)

    return newLeatherColor.save()
  }

  async findAll(filter?: FilterQuery<LeatherColorDocument>): Promise<LeatherColorDocument[]> {
    return this.LeatherColorsModel.find(filter).sort().exec()
  }

  async findOne(id: Types.ObjectId): Promise<LeatherColorDocument> {
    return this.LeatherColorsModel.findById(id)
  }

  async update(
    id: Types.ObjectId,
    updateLeatherColorDto: UpdateLeatherColorDto
  ): Promise<LeatherColorDocument> {
    await this.LeatherColorsModel.findByIdAndUpdate(id, updateLeatherColorDto)

    return this.findOne(id)
  }

  async remove(id: Types.ObjectId): Promise<LeatherColorDocument> {
    return this.LeatherColorsModel.findByIdAndRemove(id)
  }
}
