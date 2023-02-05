import { ICost } from 'src/common/interfaces/cost.interface'

import { IAddress } from '../../addresses/interfaces/address.interface'

import { TOrderStatus, TPaymentFor } from './orders.type'

export interface IOrderDate {
  deadline: Date
  delivery: Date | null
  departure: Date | null
  finishProduction: Date | null
  registration: Date
  startProduction: Date | null
}
export interface ITracking {
  site: string
  track: string
}
export interface IDeliveryOrderData {
  cost: ICost
  delivery: IAddress
  paymentFor: TPaymentFor
  tracking: ITracking | null
}

export interface IOrder {
  _id: string
  comment: string
  date: IOrderDate
  deliveryData: IDeliveryOrderData
  number: number
  ownerId: string
  products: any // TODO: написать 'ProductType[]'
  status: TOrderStatus
  sum: ICost
}
