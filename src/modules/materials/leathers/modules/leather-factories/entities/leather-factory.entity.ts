import { ApiProperty } from '@nestjs/swagger'
import { ECountry, TCountry } from 'src/common/interfaces/country.type'

export class LeatherFactoryEntity {
  @ApiProperty({ type: String, description: 'идентификационный номер фабрики производителя кожи' })
  _id: string

  @ApiProperty({
    type: [String],
    description: 'идентификационные номера артикулей производимых фабрикой',
  })
  articles: string[]

  @ApiProperty({
    enum: ECountry,
    enumName: 'ECountry',
    description: 'страна в которой находиться фабрика',
  })
  country: TCountry

  @ApiProperty({ type: String, description: 'описание фабрики' })
  description?: string = ''

  @ApiProperty({ type: String, description: 'название фабрики' })
  name: string
}
