import { IntersectionType, PartialType, PickType } from '@nestjs/swagger'

import { LeatherFactoryEntity } from '../entities/leather-factory.entity'

import { CreateLeatherFactoryDto } from './create-leather-factory.dto'

export class UpdateLeatherFactoryDto extends PartialType(
  IntersectionType(CreateLeatherFactoryDto, PickType(LeatherFactoryEntity, ['articles']))
) {}
