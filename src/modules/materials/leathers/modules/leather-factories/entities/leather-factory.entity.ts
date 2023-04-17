import { ApiProperty } from '@nestjs/swagger'
import { SchemaTypes, Types } from 'mongoose'
import { ECountry, TCountry } from 'src/common/interfaces/country.type'

export class LeatherFactoryEntity {
  @ApiProperty({
    type: SchemaTypes.ObjectId,
    description: 'идентификационный номер фабрики производителя кожи',
  })
  _id: Types.ObjectId

  @ApiProperty({
    type: [SchemaTypes.ObjectId],
    description: 'идентификационные номера артиклей производимых фабрикой',
  })
  articles: Types.ObjectId[]

  @ApiProperty({
    enum: ECountry,
    enumName: 'ECountry',
    description: 'страна в которой находиться фабрика',
  })
  country: TCountry

  @ApiProperty({ type: String, description: 'описание фабрики' })
  description?: string = ''

  @ApiProperty({ type: String, description: 'название фабрики' })
  title: string
}
