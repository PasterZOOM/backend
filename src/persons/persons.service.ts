import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { Person, PersonDocument } from 'src/persons/schemas/person.schema'

import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'
import { IPerson } from './interfaces/person.interface'

@Injectable()
export class PersonsService {
  constructor(@InjectModel(Person.name) private PersonModel: Model<PersonDocument>) {}

  async create(createPersonDto: CreatePersonDto): Promise<IPerson> {
    const newPerson = new this.PersonModel(createPersonDto)

    return newPerson.save()
  }

  async findAll(): Promise<IPerson[]> {
    return this.PersonModel.find().exec()
  }

  async findOne(id: string): Promise<IPerson> {
    return this.PersonModel.findById(id)
  }

  async update(id: string, updatePersonDto: UpdatePersonDto): Promise<IPerson> {
    return this.PersonModel.findByIdAndUpdate(id, updatePersonDto)
  }

  async remove(id: string): Promise<IPerson> {
    return this.PersonModel.findByIdAndRemove(id)
  }

  async addAddress(id: string, addressIds: string[]): Promise<IPerson> {
    return this.PersonModel.findByIdAndUpdate(id, { addressIds })
  }
}
