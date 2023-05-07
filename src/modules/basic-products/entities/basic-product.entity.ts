import { ApiProperty } from '@nestjs/swagger'
import { SchemaTypes, Types } from 'mongoose'
import { LocaleFieldEntity } from 'src/common/entities/locale-field.entity'
import { ECost } from 'src/common/interfaces/cost.type'
import { PhotosType } from 'src/modules/basic-products/entities/basic-product.type'
import { EPunchPitch } from 'src/modules/materials/common/materials.type'
import { EProductAssignment, EProductCategory } from 'src/modules/products/entities/product.type'

export class BasicProductEntity {
  @ApiProperty({
    type: SchemaTypes.ObjectId,
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
    description: 'категория к которй относится базовое изделие',
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
    type: SchemaTypes.ObjectId,
    description: 'идентификационный номер артикула кожи из которой сделано базовое изделие',
  })
  leather: Types.ObjectId

  @ApiProperty({ type: Object, description: 'массив назначений базового продукта' })
  photos: PhotosType

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
