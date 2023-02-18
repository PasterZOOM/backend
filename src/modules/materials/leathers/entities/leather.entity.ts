import { ApiProperty } from '@nestjs/swagger'

export class LeatherEntity {
  @ApiProperty({ type: String, description: 'идентификационный номер кожи' })
  _id: string

  @ApiProperty({ type: String, description: 'идентификационный номер артикуля кожи' })
  article: string

  @ApiProperty({ type: String, description: 'идентификационный номер цвета кожи' })
  color: string

  @ApiProperty({ type: String, description: 'идентификационный номер фабрики производития кожи' })
  factory: string

  @ApiProperty({ type: String, description: 'толщина кожи' })
  thickness: string
}
