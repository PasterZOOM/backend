import { TDeliveryMethod, TDeliveryPlace } from './addresses.type'

export interface IAddress {
  _id: string
  apartment: string
  city: string
  country: string
  created: string
  deliveryPlace: TDeliveryPlace
  house: string
  index: string
  ownerId: string
  region: string
  street: string
  transportCompany: TDeliveryMethod
}
