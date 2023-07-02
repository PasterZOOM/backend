import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'

export class LeatherEntity {
  @ApiProperty({ type: String, description: 'идентификационный номер кожи' })
  _id: Types.ObjectId

  @ApiProperty({ type: String, description: 'идентификационный номер артикула кожи' })
  article: Types.ObjectId

  @ApiProperty({ type: String, description: 'идентификационный номер цвета кожи' })
  color: Types.ObjectId

  @ApiProperty({
    type: String,
    description: 'идентификационный номер фабрики производителя кожи',
  })
  factory: Types.ObjectId

  @ApiProperty({ type: String, description: 'толщина кожи' })
  thickness: string
}
