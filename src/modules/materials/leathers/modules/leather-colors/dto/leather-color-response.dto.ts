import { ApiProperty, OmitType } from '@nestjs/swagger'
import { BasEntity } from 'src/common/entities/base.entity'

import { LeatherColorEntity } from '../entities/leather-color.entity'

export class LeatherColorResponse extends OmitType(LeatherColorEntity, [
  'description',
  'title',
  'article',
  'factory',
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

  @ApiProperty({
    type: BasEntity,
    description: 'фабрика к которой относится артикул к которому относится цвет',
  })
  factory: BasEntity
}
