import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { LocaleFieldEntity } from 'src/common/entities/locale-field.entity'

export class LeatherArticleEntity {
  @ApiProperty({ type: String, description: 'идентификационный номер артикула кожи' })
  _id: Types.ObjectId

  @ApiProperty({
    type: [String],
    description: 'идентификационные номера цветов кожи артикула',
  })
  colors: Types.ObjectId[]

  @ApiProperty({ type: LocaleFieldEntity, description: 'описание артикула' })
  description: LocaleFieldEntity

  @ApiProperty({
    type: String,
    description: 'идентификационный номер фабрики которая выпускает артикул',
  })
  factory: Types.ObjectId

  @ApiProperty({ type: LocaleFieldEntity, description: 'название артикула' })
  title: LocaleFieldEntity

  @ApiProperty({ type: String, description: 'значение артикула для поиска' })
  value: string
}
