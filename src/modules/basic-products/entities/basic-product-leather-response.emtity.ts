import { ApiProperty } from '@nestjs/swagger'
import { BasEntity } from 'src/common/entities/base.entity'

export class BasicProductLeatherResponse {
  @ApiProperty({ type: BasEntity, description: 'фабрика кожи из которой изготовлено изделие' })
  factory: BasEntity

  @ApiProperty({ type: BasEntity, description: 'артикль кожи из которой изготовлено изделие' })
  article: BasEntity
}
