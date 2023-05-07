import { ApiProperty } from '@nestjs/swagger'
import { SchemaTypes, Types } from 'mongoose'
import { ECost } from 'src/common/interfaces/cost.type'
import { EPunchPitch } from 'src/modules/materials/common/materials.type'
import { EProductAssignment, EProductCategory } from 'src/modules/products/entities/product.type'

export class BasicProductResponse {
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

  @ApiProperty({ type: String, description: 'описание базового изделия' })
  description: string

  @ApiProperty({
    type: SchemaTypes.ObjectId,
    description: 'идентификационный номер артикула кожи из которой сделано базовое изделие',
  })
  leather: Types.ObjectId

  @ApiProperty({
    enum: EPunchPitch,
    enumName: 'EPunchPitch',
    description: 'шаг пробойника который использовался при изготовлении',
  })
  punchPitch: EPunchPitch

  @ApiProperty({ type: String, description: 'размер изделия' })
  size: string

  @ApiProperty({ type: String, description: 'название изделия' })
  title: string
}
