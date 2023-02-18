import { IntersectionType, PartialType, PickType } from '@nestjs/swagger'

import { PersonEntity } from '../entities/person.entity'

import { CreatePersonDto } from './create-person.dto'

export class UpdatePersonDto extends PartialType(
  IntersectionType(CreatePersonDto, PickType(PersonEntity, ['description', 'role']))
) {}
