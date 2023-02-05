import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { IAddress } from './interfaces/address.interface'
import { Address, AddressDocument } from './schemas/address.schema'

@Injectable()
export class AddressesService {
  constructor(@InjectModel(Address.name) private AddressModel: Model<AddressDocument>) {}

  async create(createAddressDto: CreateAddressDto): Promise<IAddress> {
    const newAddress = new this.AddressModel(createAddressDto)

    return newAddress.save()
  }

  async findAll(): Promise<IAddress[]> {
    return this.AddressModel.find().exec()
  }

  async findOne(id: string): Promise<IAddress> {
    return this.AddressModel.findById(id)
  }

  async update(id: string, updateAddressDto: UpdateAddressDto): Promise<IAddress> {
    return this.AddressModel.findByIdAndUpdate(id, updateAddressDto)
  }

  async remove(id: string): Promise<IAddress> {
    return this.AddressModel.findByIdAndRemove(id)
  }
}