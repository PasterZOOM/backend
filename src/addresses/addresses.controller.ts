import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common'
import { PersonsService } from 'src/persons/persons.service'

import { AddressesService } from './addresses.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { IAddress } from './interfaces/address.interface'

@Controller('addresses')
export class AddressesController {
  constructor(
    private readonly addressesService: AddressesService,
    private readonly personsService: PersonsService
  ) {}

  @Post()
  async create(@Body() createAddressDto: CreateAddressDto): Promise<IAddress> {
    try {
      const person = await this.personsService.findOne(createAddressDto.personId)

      const createdAddress = await this.addressesService.create(createAddressDto)

      await this.personsService.push(person._id, { addressIds: createdAddress._id })

      return createdAddress
    } catch (e) {
      throw new BadRequestException('Person with this id is not in the database', {
        cause: new Error(),
        description: e.message,
      })
    }
  }

  @Get()
  findAll(): Promise<IAddress[]> {
    return this.addressesService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<IAddress> {
    return this.addressesService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto
  ): Promise<IAddress> {
    return this.addressesService.update(id, updateAddressDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<IAddress> {
    try {
      const address = await this.findOne(id)
      const owner = await this.personsService.findOne(address.personId)

      if (owner) {
        await this.personsService.pull(owner._id, { addressIds: id })
      }

      return this.addressesService.remove(id)
    } catch (e) {
      throw new BadRequestException('Address with this id is not in the database', {
        cause: new Error(),
        description: e.message,
      })
    }
  }

  @Patch(':id/main')
  async makeAddressMain(@Param('id') id: string): Promise<{ addressIds: string[] }> {
    return this.personsService.makeAddressMain(id)
  }
}
