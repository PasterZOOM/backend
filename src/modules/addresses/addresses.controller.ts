import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiOkResponse, ApiTags, PickType } from '@nestjs/swagger'
import { BadIdException } from 'src/common/exceptions/badId.Exceptions'

import { PersonEntity } from '../persons/entities/person.entity'
import { PersonsService } from '../persons/persons.service'

import { AddressesService } from './addresses.service'
import { CreateAddressDto } from './dto/create-address.dto'
import { UpdateAddressDto } from './dto/update-address.dto'
import { AddressEntity } from './entities/address.entity'

@ApiTags('Addresses')
@Controller('addresses')
export class AddressesController {
  constructor(
    private readonly addressesService: AddressesService,
    private readonly personsService: PersonsService
  ) {}

  @Post(':ownerId')
  async create(
    @Param('ownerId') ownerId: string,
    @Body() createAddressDto: CreateAddressDto
  ): Promise<AddressEntity> {
    try {
      const person = await this.personsService.findOne(ownerId)

      const createdAddress = await this.addressesService.create({ ...createAddressDto, ownerId })

      await this.personsService.push(person._id, { addressIds: createdAddress._id })

      return createdAddress
    } catch (e) {
      throw new BadIdException('person', e)
    }
  }

  @Get()
  findAll(): Promise<AddressEntity[]> {
    return this.addressesService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AddressEntity> {
    return this.addressesService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAddressDto: UpdateAddressDto
  ): Promise<AddressEntity> {
    return this.addressesService.update(id, updateAddressDto)
  }

  @Patch(':id/main')
  @ApiOkResponse({ type: PickType(PersonEntity, ['addressIds']) })
  async makeAddressMain(@Param('id') id: string): Promise<{ addressIds: string[] }> {
    return this.personsService.makeAddressMain(id)
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<AddressEntity> {
    try {
      const address = await this.findOne(id)
      const owner = await this.personsService.findOne(address.ownerId)

      if (owner) {
        await this.personsService.pull(owner._id, { addressIds: id })
      }

      return this.addressesService.remove(id)
    } catch (e) {
      throw new BadIdException('address', e)
    }
  }
}
