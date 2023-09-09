import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { FilterQuery, Model, ProjectionType, Types } from 'mongoose'
import { LeatherFactoryDocument } from 'modules/materials/leathers/modules/leather-factories/schemas/leather-factory.schema'

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

  async findAll(
    filter: FilterQuery<LeatherColorDocument> = {},
    projection: ProjectionType<LeatherFactoryDocument> = undefined
  ): Promise<LeatherColorDocument[]> {
    return this.LeatherColorsModel.find(filter, projection).sort().exec()
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

  async deleteMany(filter: FilterQuery<LeatherColorDocument>): Promise<boolean> {
    await this.LeatherColorsModel.deleteMany(filter)

    return true
  }
}
