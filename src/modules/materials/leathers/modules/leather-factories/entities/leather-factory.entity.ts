import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { LocaleFieldEntity } from 'common/entities/locale-field.entity'
import { ECountry, TCountry } from 'common/interfaces/country.type'

export class LeatherFactoryEntity {
  @ApiProperty({
    type: String,
    description: 'идентификационный номер фабрики производителя кожи',
  })
  _id: Types.ObjectId

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
