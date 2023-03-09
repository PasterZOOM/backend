import { ApiProperty } from '@nestjs/swagger'

import { ELeatherColor } from './leather-colors.type'

export class LeatherColorEntity {
  @ApiProperty({ type: String, description: 'идентификационный номер цвета кожи' })
  _id: string

  @ApiProperty({
    type: String,
    description: 'идентификационный номер артикуля под которым выпускается данный цввет',
  })
  article: string

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
    description: 'к какой категории чветов относится цвет',
  })
  value: string

  @ApiProperty({ type: String, description: 'описание цвета' })
  description: string
}
