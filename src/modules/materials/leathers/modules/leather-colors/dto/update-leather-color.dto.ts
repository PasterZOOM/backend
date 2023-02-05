import { OmitType, PartialType } from '@nestjs/mapped-types'

import { CreateLeatherColorDto } from './create-leather-color.dto'

export class UpdateLeatherColorDto extends PartialType(
  OmitType(CreateLeatherColorDto, ['article'])
) {}
