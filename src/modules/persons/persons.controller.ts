import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'

import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'
import { PersonEntity } from './entities/person.entity'
import { PersonsService } from './persons.service'

@ApiTags('Persons')
@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  create(@Body() createPersonDto: CreatePersonDto): Promise<PersonEntity> {
    return this.personsService.create(createPersonDto)
  }

  @Get()
  findAll(): Promise<PersonEntity[]> {
    return this.personsService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId): Promise<PersonEntity> {
    return this.personsService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() updatePersonDto: UpdatePersonDto
  ): Promise<PersonEntity> {
    return this.personsService.update(id, updatePersonDto)
  }

  @Delete(':id')
  remove(@Param('id') id: Types.ObjectId): Promise<PersonEntity> {
    return this.personsService.remove(id)
  }
}
