import { TDeliveryMethod, TDeliveryPlace } from 'src/addresses/interfaces/addresses.type'

export interface IAddress {
  _id: string
  apartment: string
  city: string
  country: string
  created: string
  personId: string
  deliveryPlace: TDeliveryPlace
  house: string
  index: string
  region: string
  street: string
  transportCompany: TDeliveryMethod
}
