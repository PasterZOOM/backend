import { ICost } from 'src/common/interfaces/cost.interface'

export class CreateOrderDto {
  readonly comment?: string

  readonly number: string

  readonly ownerId: string

  readonly products: any // TODO: написать 'ProductType[]'

  readonly sum: ICost
}
