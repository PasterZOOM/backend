import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
  Post,
} from '@nestjs/common'

import { CreatePersonDto } from './dto/create-person.dto'
import { UpdatePersonDto } from './dto/update-person.dto'
import { IPerson } from './interfaces/person.interface'
import { PersonsService } from './persons.service'

@Controller('persons')
export class PersonsController {
  constructor(private readonly personsService: PersonsService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createPersonDto: CreatePersonDto): Promise<IPerson> {
    return this.personsService.create(createPersonDto)
  }

  @Get()
  findAll(): Promise<IPerson[]> {
    try {
      return this.personsService.findAll()
    } catch (error) {
      throw new BadRequestException('Something bad happened', {
        cause: new Error(),
        description: 'Some error description',
      })
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IPerson> {
    return this.personsService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePersonDto: UpdatePersonDto
  ): Promise<IPerson> {
    let person = await this.personsService.findOne(id)

    person = { ...person, ...updatePersonDto }

    return this.personsService.update(id, person)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IPerson> {
    return this.personsService.remove(id)
  }
}
