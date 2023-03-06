import { ApiProperty } from '@nestjs/swagger'

export class CostEntity {
  @ApiProperty({ type: Number, description: 'стоимость в BYN' })
  BYN: number

  @ApiProperty({ type: Number, description: 'стоимость в CNY' })
  CNY: number

  @ApiProperty({ type: Number, description: 'стоимость в EUR' })
  EUR: number

  @ApiProperty({ type: Number, description: 'стоимость в BYN' })
  GBP: number

  @ApiProperty({ type: Number, description: 'стоимость в JPY' })
  JPY: number

  @ApiProperty({ type: Number, description: 'стоимость в RUB' })
  RUB: number

  @ApiProperty({ type: Number, description: 'стоимость в UAH' })
  UAH: number

  @ApiProperty({ type: Number, description: 'стоимость в USD' })
  USD: number
}
