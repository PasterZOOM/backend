import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes, Types } from 'mongoose'
import { CostEntity } from 'common/interfaces/cost.entity'

import { DeliveryOrderDataEntity } from '../entities/deliveryOrderData.entity'
import { OrderEntity } from '../entities/order.entity'
import { OrderDateEntity } from '../entities/orderDate.entity'
import { EOrderStatus, TOrderStatus } from '../entities/orders.type'

export type OrderDocument = Document & Order

@Schema()
export class Order implements Omit<OrderEntity, '_id'> {
  @Prop({ default: '' })
  comment: string

  @Prop(
    raw({
      deadline: { type: Date },
      delivery: { type: Date },
      departure: { type: Date },
      finishProduction: { type: Date },
      registration: { type: Date },
      startProduction: { type: Date },
    })
  )
  date: OrderDateEntity

  @Prop(
    raw({
      cost: {
        type: raw({
          BYN: Number,
          CNY: Number,
          EUR: Number,
          GBP: Number,
          JPY: Number,
          RUB: Number,
          UAH: Number,
          USD: Number,
        }),
      },
      delivery: { type: String },
      paymentFor: { type: String },
      tracking: {
        type: raw({
          site: String,
          track: String,
        }),
      },
    })
  )
  deliveryData: DeliveryOrderDataEntity

  @Prop({ default: '' })
  number: string

  @Prop({ type: SchemaTypes.ObjectId, default: '' })
  ownerId: Types.ObjectId

  @Prop({ type: [SchemaTypes.ObjectId], default: '' })
  products: Types.ObjectId[]

  @Prop({ default: EOrderStatus.REGISTERED })
  status: TOrderStatus

  @Prop(
    raw({
      BYN: Number,
      CNY: Number,
      EUR: Number,
      GBP: Number,
      JPY: Number,
      RUB: Number,
      UAH: Number,
      USD: Number,
    })
  )
  sum: CostEntity
}

export const OrderSchema = SchemaFactory.createForClass(Order)

export const OrderAlias = Order.name
