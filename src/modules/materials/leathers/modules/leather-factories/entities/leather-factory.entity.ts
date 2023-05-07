import { ApiProperty } from '@nestjs/swagger'
import { SchemaTypes, Types } from 'mongoose'
import { LocaleFieldEntity } from 'src/common/entities/locale-field.entity'
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

  @ApiProperty({ type: LocaleFieldEntity, description: 'описание фабрики' })
  description: LocaleFieldEntity

  @ApiProperty({ type: LocaleFieldEntity, description: 'название фабрики' })
  title: LocaleFieldEntity
}
