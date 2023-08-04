import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger'

import { CreateLeatherColorDto } from './create-leather-color.dto'

export class UpdateLeatherColorDto extends PartialType(
  OmitType(
    IntersectionType(
      CreateLeatherColorDto
      // PickType(LeatherColorEntity, ['article']) // TODO добавить возможность изменять артикул для цвета
    ),
    ['factory']
  )
) {}
