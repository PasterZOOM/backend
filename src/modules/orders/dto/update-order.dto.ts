import { PartialType } from '@nestjs/mapped-types'
import { ICost } from 'src/common/interfaces/cost.interface'
import { IOrderDate, IDeliveryOrderData } from 'src/modules/orders/interfaces/order.interface'
import { TOrderStatus } from 'src/modules/orders/interfaces/orders.type'

import { CreateOrderDto } from './create-order.dto'

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  readonly date: Partial<IOrderDate>

  readonly deliveryData: Partial<IDeliveryOrderData>

  readonly products: any // TODO: написать 'ProductType[]'

  readonly status: TOrderStatus

  readonly sum: ICost
}
