import { ApiProperty } from '@nestjs/swagger'
import { SchemaTypes, Types } from 'mongoose'
import { LocaleFieldEntity } from 'src/common/entities/locale-field.entity'

export class LeatherArticleEntity {
  @ApiProperty({ type: SchemaTypes.ObjectId, description: 'идентификационный номер артикула кожи' })
  _id: Types.ObjectId

  @ApiProperty({
    type: [SchemaTypes.ObjectId],
    description: 'идентификационные номера цветов кожи артикула',
  })
  colors: Types.ObjectId[]

  @ApiProperty({ type: LocaleFieldEntity, description: 'описание артикула' })
  description: LocaleFieldEntity

  @ApiProperty({
    type: SchemaTypes.ObjectId,
    description: 'идентификационный номер фабрики которая выпускает артикул',
  })
  factory: Types.ObjectId

  @ApiProperty({ type: LocaleFieldEntity, description: 'название артикула' })
  title: LocaleFieldEntity
}
