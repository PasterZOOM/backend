import { ApiProperty, OmitType } from '@nestjs/swagger'
import { BasicProductLeatherResponse } from 'src/modules/basic-products/entities/basic-product-leather-response.emtity'

import { BasicProductColor } from '../entities/basic-product-color.entity'
import { BasicProductEntity } from '../entities/basic-product.entity'

export class BasicProductResponse extends OmitType(BasicProductEntity, [
  'leather',
  'size',
  'title',
  'description',
]) {
  @ApiProperty({
    type: String,
    description: 'Размер изделия на языке локали',
  })
  size: string

  @ApiProperty({
    type: String,
    description: 'Название изделия на языке локали',
  })
  title: string

  @ApiProperty({
    type: String,
    description: 'Описание изделия на языке локали',
  })
  description: string

  @ApiProperty({
    type: BasicProductLeatherResponse,
    description: 'Из какой кожи изготовлено изделие',
  })
  leather: BasicProductLeatherResponse

  @ApiProperty({ type: [BasicProductColor], description: 'В каких цветах существует изделие' })
  productColors: BasicProductColor[]
}
