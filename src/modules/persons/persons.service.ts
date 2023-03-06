import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'
import { PersonEntity } from './entities/person.entity'
import { PersonAlias, PersonDocument } from './schemas/person.schema'

@Injectable()
export class PersonsService {
  constructor(@InjectModel(PersonAlias) private PersonModel: Model<PersonDocument>) {}

  async create(createPersonDto: CreatePersonDto): Promise<PersonEntity> {
    const newPerson = new this.PersonModel(createPersonDto)

    return newPerson.save()
  }

  async findAll(): Promise<PersonEntity[]> {
    return this.PersonModel.find().sort().exec()
  }

  async findOne(id: string): Promise<PersonEntity> {
    return this.PersonModel.findById(id)
  }

  async update(id: string, updatePersonDto: UpdatePersonDto): Promise<PersonEntity> {
    return this.PersonModel.findByIdAndUpdate(id, updatePersonDto)
  }

  async remove(id: string): Promise<PersonEntity> {
    await this.PersonModel.findByIdAndRemove(id)

    return this.findOne(id)
  }

  async push(
    id: string,
    addToSet: { [key in keyof Partial<Pick<PersonEntity, 'addressIds' | 'orderIds'>>]: string }
  ): Promise<PersonEntity> {
    return this.PersonModel.findByIdAndUpdate(id, { $addToSet: addToSet })
  }

  async pull(
    id: string,
    pulled: { [key in keyof Partial<Pick<PersonEntity, 'addressIds' | 'orderIds'>>]: string }
  ): Promise<PersonEntity> {
    return this.PersonModel.findByIdAndUpdate(id, { $pull: pulled })
  }

  async makeAddressMain(id: string): Promise<{ addressIds: string[] }> {
    const { _id, addressIds } = await this.PersonModel.findOne({ addressIds: id }, [
      '_id',
      'addressIds',
    ])
    const mainIndex = addressIds.findIndex(addressId => addressId === id)
    const mainAddress = addressIds.splice(mainIndex, 1)
    const addressesWithNewMain = [...mainAddress, ...addressIds]

    return this.PersonModel.findByIdAndUpdate(
      _id,
      { addressIds: addressesWithNewMain },
      { projection: ['addressIds'] }
    )
  }
}
