import { ApiProperty } from '@nestjs/swagger'

export class LeatherArticleEntity {
  @ApiProperty({ type: String, description: 'идентификационный номер артикуля кожи' })
  _id: string

  @ApiProperty({
    type: [String],
    description: 'идентификационные номера цветов кожи артикуля',
  })
  colors: string[]

  @ApiProperty({ type: String, description: 'описание артикула' })
  description?: string = ''

  @ApiProperty({
    type: String,
    description: 'идентификационный номер фабрики которая выпускает артикул',
  })
  factory: string

  @ApiProperty({ type: String, description: 'название артикула' })
  title: string
}
