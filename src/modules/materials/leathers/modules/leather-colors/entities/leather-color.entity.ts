import { ApiProperty } from '@nestjs/swagger'
import { SchemaTypes, Types } from 'mongoose'

import { ELeatherColor } from './leather-colors.type'

export class LeatherColorEntity {
  @ApiProperty({ type: SchemaTypes.ObjectId, description: 'идентификационный номер цвета кожи' })
  _id: Types.ObjectId

  @ApiProperty({
    type: SchemaTypes.ObjectId,
    description: 'идентификационный номер артикула под которым выпускается данный цвет',
  })
  article: Types.ObjectId

  @ApiProperty({
    type: String,
    description: 'код цвета кожи',
  })
  code: string

  @ApiProperty({ type: String, description: 'фото цвета кожи' })
  photo: string

  @ApiProperty({
    type: String,
    description: 'название цвета',
  })
  title: string

  @ApiProperty({
    enum: ELeatherColor,
    enumName: 'ELeatherColor',
    description: 'к какой категории цветов относится цвет',
  })
  value: string

  @ApiProperty({ type: String, description: 'описание цвета' })
  description: string
}
