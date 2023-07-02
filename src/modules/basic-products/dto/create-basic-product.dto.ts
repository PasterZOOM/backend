import { OmitType } from '@nestjs/swagger'

import { BasicProductEntity } from '../entities/basic-product.entity'

export class CreateBasicProductDto extends OmitType(BasicProductEntity, [
  '_id',
  'isPublished',
  'photos',
]) {}
