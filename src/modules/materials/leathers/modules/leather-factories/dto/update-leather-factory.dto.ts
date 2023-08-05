import { IntersectionType, PartialType } from '@nestjs/swagger'

import { CreateLeatherFactoryDto } from './create-leather-factory.dto'

export class UpdateLeatherFactoryDto extends PartialType(
  IntersectionType(CreateLeatherFactoryDto)
) {}
