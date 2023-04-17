import { ApiProperty } from '@nestjs/swagger'
import { SchemaTypes, Types } from 'mongoose'

export class LeatherArticleEntity {
  @ApiProperty({ type: SchemaTypes.ObjectId, description: 'идентификационный номер артикуля кожи' })
  _id: Types.ObjectId

  @ApiProperty({
    type: [SchemaTypes.ObjectId],
    description: 'идентификационные номера цветов кожи артикула',
  })
  colors: Types.ObjectId[]

  @ApiProperty({ type: String, description: 'описание артикула' })
  description?: string = ''

  @ApiProperty({
    type: SchemaTypes.ObjectId,
    description: 'идентификационный номер фабрики которая выпускает артикул',
  })
  factory: Types.ObjectId

  @ApiProperty({ type: String, description: 'название артикула' })
  title: string
}
