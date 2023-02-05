import { ICost } from 'src/common/interfaces/cost.interface'

import { IOrderDate } from '../interfaces/order.interface'

export class CreateOrderDto {
  readonly comment?: string

  readonly date: Partial<IOrderDate>

  readonly number: string

  readonly ownerId: string

  readonly products: any // TODO: написать 'ProductType[]'

  readonly sum: ICost
}
