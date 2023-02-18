import { OmitType } from '@nestjs/swagger'

import { LeatherColorEntity } from '../entities/leather-color.entity'

export class CreateLeatherColorDto extends OmitType(LeatherColorEntity, ['_id', 'article']) {}
