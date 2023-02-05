import { PartialType } from '@nestjs/mapped-types'

import { TPersonRole } from '../interfaces/persons.type'

import { CreatePersonDto } from './create-person.dto'

export class UpdatePersonDto extends PartialType(CreatePersonDto) {
  readonly addressIds: string[]

  readonly description: string

  readonly orderIds: string[]

  readonly role: TPersonRole
}