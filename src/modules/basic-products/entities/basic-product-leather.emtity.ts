import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'

export class BasicProductLeather {
  @ApiProperty({
    type: String,
    description: 'идентификационный номер фабрики кожи из которой изготовлено изделие',
  })
  factory: Types.ObjectId

  @ApiProperty({
    type: String,
    description: 'идентификационный номер артикула кожи из которой изготовлено изделие',
  })
  article: Types.ObjectId
}
