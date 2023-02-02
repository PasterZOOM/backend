import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ICost } from 'src/common/interfaces/cost.interface'
import { EOrderStatus, TOrderStatus } from 'src/modules/orders/interfaces/orders.type'

import { IDeliveryOrderData, IOrder, IOrderDate } from '../interfaces/order.interface'

export type OrderDocument = Order & Document

@Schema()
export class Order implements Omit<IOrder, '_id'> {
  @Prop({ default: '' })
  comment: string

  @Prop({ default: new Date().toISOString() })
  created: string

  @Prop({ default: '' })
  customerId: string

  @Prop({ default: '' })
  date: IOrderDate

  deliveryData: IDeliveryOrderData

  @Prop({ default: '' })
  id: string

  @Prop({ default: 0 })
  number: number

  products: any // TODO: написать 'ProductType[]'

  @Prop({ default: EOrderStatus.REGISTERED })
  status: TOrderStatus

  sum: ICost
}

export const OrderSchema = SchemaFactory.createForClass(Order)
