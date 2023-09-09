import { PickType } from '@nestjs/swagger'
import { ProductEntity } from 'modules/products/entities/product.entity'

export class CreateProductDto extends PickType(ProductEntity, [
  'category',
  'comment',
  'cost',
  'description',
  'leather',
  'photo',
  'punchPitch',
  'size',
  'thread',
  'title',
  'type',
  'orderId',
]) {}
