import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { AddressEntity } from './entities/address.entity'
import { AddressAlias, AddressDocument } from './schemas/address.schema'

@Injectable()
export class AddressesService {
  constructor(@InjectModel(AddressAlias) private AddressModel: Model<AddressDocument>) {}

  async create(
    createAddressDto: CreateAddressDto & { ownerId: Types.ObjectId }
  ): Promise<AddressEntity> {
    const newAddress = new this.AddressModel(createAddressDto)

    return newAddress.save()
  }

  async findAll(): Promise<AddressEntity[]> {
    return this.AddressModel.find().exec()
  }

  async findOne(id: Types.ObjectId): Promise<AddressEntity> {
    return this.AddressModel.findById(id)
  }

  async update(id: Types.ObjectId, updateAddressDto: UpdateAddressDto): Promise<AddressEntity> {
    this.AddressModel.findByIdAndUpdate(id, updateAddressDto)

    return this.findOne(id)
  }

  async remove(id: Types.ObjectId): Promise<AddressEntity> {
    return this.AddressModel.findByIdAndRemove(id)
  }
}
