import { ApiProperty } from '@nestjs/swagger'
import { SchemaTypes, Types } from 'mongoose'

export class LeatherEntity {
  @ApiProperty({ type: SchemaTypes.ObjectId, description: 'идентификационный номер кожи' })
  _id: Types.ObjectId

  @ApiProperty({ type: SchemaTypes.ObjectId, description: 'идентификационный номер артикула кожи' })
  article: Types.ObjectId

  @ApiProperty({ type: SchemaTypes.ObjectId, description: 'идентификационный номер цвета кожи' })
  color: Types.ObjectId

  @ApiProperty({
    type: SchemaTypes.ObjectId,
    description: 'идентификационный номер фабрики производителя кожи',
  })
  factory: Types.ObjectId

  @ApiProperty({ type: String, description: 'толщина кожи' })
  thickness: string
}
