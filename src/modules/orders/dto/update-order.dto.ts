import { IntersectionType, PartialType, PickType } from '@nestjs/swagger'

import { OrderEntity } from '../entities/order.entity'

import { CreateOrderDto } from './create-order.dto'

export class UpdateOrderDto extends PartialType(
  IntersectionType(
    CreateOrderDto,
    PickType(OrderEntity, ['date', 'deliveryData', 'products', 'status', 'sum'])
  )
) {}
