import { PickType } from '@nestjs/swagger'

import { PersonEntity } from '../entities/person.entity'

export class CreatePersonDto extends PickType(PersonEntity, [
  'communicationMethod',
  'email',
  'firstName',
  'gender',
  'instagram',
  'lastName',
  'patronymic',
  'phone',
  'subscription',
  'telegram',
  'viber',
  'vk',
  'whatsApp',
]) {}
