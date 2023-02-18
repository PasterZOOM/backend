import { ApiProperty } from '@nestjs/swagger'

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

  @ApiProperty({
    type: String,
    description: 'название цвета',
  })
  name: string

  @ApiProperty({ type: String, description: 'описание цвета' })
  description: string
}
