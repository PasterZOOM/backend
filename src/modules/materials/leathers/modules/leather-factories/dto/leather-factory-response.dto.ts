import { ApiProperty } from '@nestjs/swagger'
import { ECountry, TCountry } from 'src/common/interfaces/country.type'

export class LeatherFactoryResponse {
  @ApiProperty({
    enum: ECountry,
    enumName: 'ECountry',
    description: 'страна в которой находиться фабрика',
  })
  country: TCountry

  @ApiProperty({ type: String, description: 'описание фабрики' })
  description: string

  @ApiProperty({ type: String, description: 'название фабрики' })
  title: string
}
