import { OmitType } from '@nestjs/swagger'

import { CreateBasicProductDto } from '../dto/create-basic-product.dto'

import { CreateBasicProductResponseLeather } from './create-basic-product-response-leather.entity'

export class CreateBasicProductResponse extends OmitType(CreateBasicProductDto, ['leather']) {
  leather: CreateBasicProductResponseLeather
}
