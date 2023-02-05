import { TCountry } from 'src/common/interfaces/country.type'

export class CreateLeatherFactoryDto {
  readonly country: TCountry

  readonly description: string

  readonly name: string
}
