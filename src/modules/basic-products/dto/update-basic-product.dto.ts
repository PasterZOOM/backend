import { IntersectionType, OmitType, PartialType } from '@nestjs/swagger'
import { BasicProductEntity } from 'src/modules/basic-products/entities/basic-product.entity'

export class UpdateBasicProductDto extends PartialType(
  IntersectionType(OmitType(BasicProductEntity, ['_id']))
) {}
