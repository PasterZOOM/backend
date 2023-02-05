import { TDeliveryMethod, TDeliveryPlace } from '../interfaces/addresses.type'

export class CreateAddressDto {
  readonly apartment?: string

  readonly city: string

  readonly country: string

  readonly deliveryPlace: TDeliveryPlace

  readonly house: string

  readonly index: string

  readonly ownerId: string

  readonly region: string

  readonly street: string

  readonly transportCompany: TDeliveryMethod
}