import { ICost } from 'src/common/interfaces/cost.interface'

import { IOrderDate } from '../interfaces/order.interface'

export class CreateOrderDto {
  comment?: string

  date: Partial<IOrderDate>

  number: string

  ownerId: string

  products: any // TODO: написать 'ProductType[]'

  sum: ICost
}
