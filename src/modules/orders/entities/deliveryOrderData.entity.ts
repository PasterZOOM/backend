import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { CostEntity } from 'src/common/interfaces/cost.entity'

import { EPaymentFor, TPaymentFor } from './orders.type'
import { TrackingEntity } from './tracking.entity'

export class DeliveryOrderDataEntity {
  @ApiProperty({ type: () => CostEntity })
  cost: CostEntity

  @ApiProperty({
    type: String,
    description: 'идентификационный номер адреса доставки',
  })
  delivery: Types.ObjectId

  @ApiProperty({
    enum: EPaymentFor,
    enumName: 'EPaymentFor',
    description: 'за чей счет осуществляется доставка',
  })
  paymentFor: TPaymentFor

  @ApiProperty({ type: () => TrackingEntity })
  tracking: TrackingEntity
}
