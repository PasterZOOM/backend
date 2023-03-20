import { IntersectionType, PartialType } from '@nestjs/swagger'

import { CreateLeatherColorDto } from './create-leather-color.dto'

export class UpdateLeatherColorDto extends PartialType(
  IntersectionType(
    CreateLeatherColorDto
    // PickType(LeatherColorEntity, ['article']) TODO добавить возможность изменять артикул для цвета
  )
) {}
