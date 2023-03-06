import { PickType } from '@nestjs/swagger'

import { OrderEntity } from '../entities/order.entity'

export class CreateOrderDto extends PickType(OrderEntity, ['ownerId', 'number', 'date']) {}
