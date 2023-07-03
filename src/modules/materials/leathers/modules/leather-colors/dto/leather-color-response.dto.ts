import { ApiProperty, OmitType } from '@nestjs/swagger'
import { BasEntity } from 'src/common/entities/base.entity'

import { LeatherColorEntity } from '../entities/leather-color.entity'

export class LeatherColorResponse extends OmitType(LeatherColorEntity, [
  'description',
  'title',
  'article',
]) {
  @ApiProperty({
    type: String,
    description: 'название цвета',
  })
  title: string

  @ApiProperty({ type: String, description: 'описание цвета' })
  description: string

  @ApiProperty({ type: BasEntity, description: 'артикул к которому относится цвет' })
  article: BasEntity
}
