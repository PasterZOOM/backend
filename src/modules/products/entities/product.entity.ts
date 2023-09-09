import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { CostEntity } from 'common/interfaces/cost.entity'

import { EPunchPitch, TPunchPitch } from '../../materials/common/materials.type'

import { EProductCategory, TProductAssignment, TProductCategory } from './product.type'

export class ProductEntity {
  @ApiProperty({ type: String, description: 'идентификационный номер изделия' })
  _id: Types.ObjectId

  @ApiProperty({
    type: [String],
    description: 'к каким категориям относится изделие',
  })
  category?: TProductAssignment[] = []

  @ApiProperty({ type: String, description: 'комментарий к изделию' })
  comment?: string = ''

  @ApiProperty({ type: () => CostEntity })
  cost?: CostEntity = {
    BYN: NaN,
    EUR: NaN,
    GBP: NaN,
    JPY: NaN,
    RUB: NaN,
    USD: NaN,
    UAH: NaN,
    CNY: NaN,
  }

  @ApiProperty({ type: String, description: 'описание изделия' })
  description?: string = ''

  @ApiProperty({
    type: String,
    description: 'идентификационный номер кожи из которой изготовлено изделие',
  })
  leather: Types.ObjectId

  @ApiProperty({
    type: String,
    description:
      "идентификационный номер заказа для которого было изготовлено изделие, '' - изделие в наличии",
  })
  orderId?: Types.ObjectId

  @ApiProperty({ type: String, description: 'фото изделия' })
  photo?: string = ''

  @ApiProperty({
    enum: EPunchPitch,
    enumName: 'EPunchPitch',
    description: 'шаг пробойника который использовался при изготовлении',
  })
  punchPitch: TPunchPitch

  @ApiProperty({ type: String, description: 'размер изделия' })
  size: string

  @ApiProperty({
    type: String,
    description: 'идентификационный номер нити которой прошито изделие',
  })
  thread: Types.ObjectId

  @ApiProperty({ type: String, description: 'название изделия' })
  title: string

  @ApiProperty({
    enum: EProductCategory,
    enumName: 'EProductType',
    description: 'тип изделия',
  })
  type: TProductCategory
}
