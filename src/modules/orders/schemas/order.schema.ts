import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ICost } from 'src/common/interfaces/cost.interface'

import { IDeliveryOrderData, IOrder, IOrderDate } from '../interfaces/order.interface'
import { EOrderStatus, TOrderStatus } from '../interfaces/orders.type'

export type OrderDocument = Order & Document

@Schema()
export class Order implements Omit<IOrder, '_id'> {
  @Prop({ default: '' })
  comment: string

  @Prop({ type: Object })
  date: IOrderDate

  @Prop({ type: Object })
  deliveryData: IDeliveryOrderData

  @Prop({ default: 0 })
  number: number

  @Prop({ default: '' })
  ownerId: string

  @Prop({ type: Object })
  products: any // TODO: написать 'ProductType[]'

  @Prop({ default: EOrderStatus.REGISTERED })
  status: TOrderStatus

  @Prop({ type: Object })
  sum: ICost
}

export const OrderSchema = SchemaFactory.createForClass(Order)
