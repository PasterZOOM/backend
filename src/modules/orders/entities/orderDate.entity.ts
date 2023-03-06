import { ApiProperty } from '@nestjs/swagger'

export class OrderDateEntity {
  @ApiProperty({ type: Date, description: 'дата конечного срока изготовления' })
  deadline: Date

  @ApiProperty({ type: Date, description: 'дата доставки заказа' })
  delivery: Date | null

  @ApiProperty({ type: Date, description: 'дата отправления заказа' })
  departure: Date | null

  @ApiProperty({ type: Date, description: 'дата окончания изготовления' })
  finishProduction: Date | null

  @ApiProperty({ type: Date, description: 'дата регистрации заказа' })
  registration: Date

  @ApiProperty({ type: Date, description: 'дата начала изготовления заказа' })
  startProduction: Date | null
}
