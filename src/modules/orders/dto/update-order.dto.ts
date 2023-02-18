import { ApiProperty, PartialType } from '@nestjs/swagger'
import { ICost } from 'src/common/interfaces/cost.interface'

import { IDeliveryOrderData, IOrderDate } from '../interfaces/order.interface'
import { EOrderStatus, TOrderStatus } from '../interfaces/orders.type'

import { CreateOrderDto } from './create-order.dto'

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  date: Partial<IOrderDate>

  deliveryData: Partial<IDeliveryOrderData>

  products: any // TODO: написать 'ProductType[]'

  @ApiProperty({ enum: EOrderStatus, enumName: 'TOrderStatus' })
  status: TOrderStatus

  sum: ICost
}
