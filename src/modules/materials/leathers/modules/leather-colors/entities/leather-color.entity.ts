import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { LocaleFieldEntity } from 'src/common/entities/locale-field.entity'

import { ELeatherColor } from './leather-colors.type'

export class LeatherColorEntity {
  @ApiProperty({ type: String, description: 'идентификационный номер цвета кожи' })
  _id: Types.ObjectId

  @ApiProperty({
    type: String,
    description: 'идентификационный номер артикула под которым выпускается данный цвет',
  })
  article: Types.ObjectId

  @ApiProperty({
    type: String,
    description: 'идентификационный номер фабрики под артикулом которой выпускается данный цвет',
  })
  factory: Types.ObjectId

  @ApiProperty({
    type: String,
    description: 'код цвета кожи',
  })
  code: string

  @ApiProperty({ type: String, description: 'фото цвета кожи' })
  photo: string

  @ApiProperty({
    type: LocaleFieldEntity,
    description: 'название цвета',
  })
  title: LocaleFieldEntity

  @ApiProperty({
    enum: ELeatherColor,
    enumName: 'ELeatherColor',
    description: 'к какой категории цветов относится цвет',
  })
  value: string

  @ApiProperty({ type: LocaleFieldEntity, description: 'описание цвета' })
  description: LocaleFieldEntity
}
