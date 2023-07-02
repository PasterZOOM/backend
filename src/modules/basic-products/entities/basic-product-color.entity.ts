import { ApiProperty, PickType } from '@nestjs/swagger'

import { LeatherColorEntity } from '../../materials/leathers/modules/leather-colors/entities/leather-color.entity'

export class BasicProductColor extends PickType(LeatherColorEntity, ['_id', 'photo']) {
  @ApiProperty({ type: String, description: 'название цвета' })
  title: string
}
