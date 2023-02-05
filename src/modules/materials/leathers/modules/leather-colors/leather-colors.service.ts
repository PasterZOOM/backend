import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateLeatherColorDto } from './dto/create-leather-color.dto'
import { UpdateLeatherColorDto } from './dto/update-leather-color.dto'
import { ILeatherColor } from './interfaces/leather-color.interface'
import { LeatherColor, LeatherColorDocument } from './schemas/leather-color.schema'

@Injectable()
export class LeatherColorsService {
  constructor(
    @InjectModel(LeatherColor.name) private LeatherColorsModel: Model<LeatherColorDocument>
  ) {}

  async create(createLeatherColorDto: CreateLeatherColorDto): Promise<ILeatherColor> {
    const newLeatherColor = new this.LeatherColorsModel(createLeatherColorDto)

    return newLeatherColor.save()
  }

  async findAll(): Promise<ILeatherColor[]> {
    return this.LeatherColorsModel.find().sort().exec()
  }

  async findOne(id: string): Promise<ILeatherColor> {
    return this.LeatherColorsModel.findById(id)
  }

  async update(id: string, updateLeatherColorDto: UpdateLeatherColorDto): Promise<ILeatherColor> {
    return this.LeatherColorsModel.findByIdAndUpdate(id, updateLeatherColorDto)
  }

  async remove(id: string): Promise<ILeatherColor> {
    return this.LeatherColorsModel.findByIdAndRemove(id)
  }
}
