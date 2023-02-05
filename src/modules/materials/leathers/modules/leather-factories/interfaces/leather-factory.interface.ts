import { TCountry } from 'src/common/interfaces/country.type'

export interface ILeatherFactory {
  _id: string
  articles: string[]
  country: TCountry
  description: string
  name: string
}
