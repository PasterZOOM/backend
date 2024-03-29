import { ApiProperty } from '@nestjs/swagger'

export class TrackingEntity {
  @ApiProperty({ type: String, description: 'сайт для отслеживания посылки' })
  site: string

  @ApiProperty({ type: String, description: 'трэк-номер для отслеживания' })
  track: string
}
