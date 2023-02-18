import { IntersectionType, PartialType, PickType } from '@nestjs/swagger'

import { LeatherColorEntity } from '../entities/leather-color.entity'

import { CreateLeatherColorDto } from './create-leather-color.dto'

export class UpdateLeatherColorDto extends PartialType(
  IntersectionType(CreateLeatherColorDto, PickType(LeatherColorEntity, ['article']))
) {}
