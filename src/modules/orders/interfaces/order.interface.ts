import { ICost } from 'src/common/interfaces/cost.interface'

import { IAddress } from '../../addresses/interfaces/address.interface'

import { TOrderStatus, TPaymentFor } from './orders.type'

export interface IOrderDate {
  deadline: string
  delivery: string
  departure: string
  finishProduction: string
  registration: string
  startProduction: string
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
  created: string
  date: IOrderDate
  deliveryData: IDeliveryOrderData
  number: number
  ownerId: string
  products: any // TODO: написать 'ProductType[]'
  status: TOrderStatus
  sum: ICost
}
