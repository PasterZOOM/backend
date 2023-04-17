import { ApiProperty } from '@nestjs/swagger'
import { SchemaTypes, Types } from 'mongoose'
import { CostEntity } from 'src/common/interfaces/cost.entity'

import { DeliveryOrderDataEntity } from './deliveryOrderData.entity'
import { OrderDateEntity } from './orderDate.entity'
import { EOrderStatus, TOrderStatus } from './orders.type'

export class OrderEntity {
  @ApiProperty({ type: SchemaTypes.ObjectId, description: 'идентификационный номер заказа' })
  _id: Types.ObjectId

  @ApiProperty({ type: String, description: 'комментарий к заказу' })
  comment: string

  @ApiProperty({ type: () => OrderDateEntity, description: 'инфорация о датах выполнения заказа' })
  date: OrderDateEntity

  @ApiProperty({ type: () => DeliveryOrderDataEntity, description: 'информация о доставке заказа' })
  deliveryData: DeliveryOrderDataEntity

  @ApiProperty({ type: String, description: 'номер заказа' })
  number: string

  @ApiProperty({ type: SchemaTypes.ObjectId, description: 'идентификационный номер заказчика' })
  ownerId: Types.ObjectId

  @ApiProperty({ type: SchemaTypes.ObjectId, description: 'идентификационные номера изделий' })
  products: Types.ObjectId[]

  @ApiProperty({
    enum: EOrderStatus,
    enumName: 'EOrderStatus',
    description: 'статус на каком этапе находится заказ',
  })
  status: TOrderStatus

  @ApiProperty({ type: () => CostEntity, description: 'сумма заказа' })
  sum: CostEntity
}
