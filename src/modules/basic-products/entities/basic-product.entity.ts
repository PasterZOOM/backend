import { ApiProperty, getSchemaPath } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { LocaleFieldEntity } from 'src/common/entities/locale-field.entity'
import { ECost } from 'src/common/interfaces/cost.type'
import { BasicProductPhotoEntity } from 'src/modules/basic-products/entities/basic-product-photo.entity'
import { EPunchPitch } from 'src/modules/materials/common/materials.type'
import { EProductAssignment, EProductCategory } from 'src/modules/products/entities/product.type'
import { v1 } from 'uuid'

export class BasicProductEntity {
  @ApiProperty({
    type: String,
    description: 'идентификационный номер базового изделия',
  })
  _id: Types.ObjectId

  @ApiProperty({
    type: () => [String],
    description: 'массив назначений базового продукта',
  })
  assignments: EProductAssignment[]

  @ApiProperty({
    enum: EProductCategory,
    enumName: 'EProductCategory',
    description: 'категория к которой относится базовое изделие',
  })
  category: EProductCategory

  @ApiProperty({ type: Number, description: 'цена изделия' })
  cost: number

  @ApiProperty({
    enum: ECost,
    enumName: 'ECost',
    description: 'валюта в которой представлена цена на изделие',
  })
  costCurrency: ECost

  @ApiProperty({ type: LocaleFieldEntity, description: 'описание базового изделия' })
  description: LocaleFieldEntity

  @ApiProperty({
    type: String,
    description: 'идентификационный номер артикула кожи из которой сделано базовое изделие',
  })
  leather: Types.ObjectId

  @ApiProperty({
    type: Object,
    description: 'объект с фотографиями базового продукта',
    additionalProperties: { type: 'array', $ref: getSchemaPath(BasicProductPhotoEntity) },
    example: { [v1()]: [{ _id: v1(), url: 'https://example.com/picture.ing' }] },
  })
  photos: Record<string, BasicProductPhotoEntity[]>

  @ApiProperty({
    enum: EPunchPitch,
    enumName: 'EPunchPitch',
    description: 'шаг пробойника который использовался при изготовлении',
  })
  punchPitch: EPunchPitch

  @ApiProperty({ type: LocaleFieldEntity, description: 'размер изделия' })
  size: LocaleFieldEntity

  @ApiProperty({ type: LocaleFieldEntity, description: 'название изделия' })
  title: LocaleFieldEntity

  @ApiProperty({ type: String, description: 'опубликованное ли изделие' })
  isPublished: boolean // TODO: отдавать неопубликованные только, если есть токен админа
}
