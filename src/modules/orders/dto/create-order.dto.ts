import { ICost } from 'src/common/interfaces/cost.interface'

export class CreateOrderDto {
  readonly comment?: string

  readonly customerId: string

  readonly products: any // TODO: написать 'ProductType[]'

  readonly sum: ICost
}
