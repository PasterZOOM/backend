import { ApiProperty } from '@nestjs/swagger'

export class CreateBasicProductResponseLeather {
  @ApiProperty({
    type: String,
    description: 'идентификационный номер фабрики кожи из которой изготовлено изделие',
  })
  factory: string

  @ApiProperty({
    type: String,
    description: 'идентификационный номер артикула кожи из которой изготовлено изделие',
  })
  article: string
}
