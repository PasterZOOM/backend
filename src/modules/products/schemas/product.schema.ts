import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { CostEntity } from 'src/common/interfaces/cost.entity'

import { EPunchPitch, TPunchPitch } from '../../materials/common/materials.type'
import { ProductEntity } from '../entities/product.entity'
import { EProductType, TProductCategory, TProductType } from '../entities/product.type'

export type ProductDocument = Product & Document

@Schema()
export class Product implements Omit<ProductEntity, '_id'> {
  @Prop({ type: [String] })
  category: TProductCategory[]

  @Prop({ default: '' })
  comment: string

  @Prop({ type: () => CostEntity })
  cost: CostEntity

  @Prop({ default: '' })
  description: string

  @Prop({ default: '' })
  leather: string

  @Prop({ default: '' })
  orderId: string

  @Prop({ default: '' })
  photo: string

  @Prop({ default: EPunchPitch.LITTLE })
  punchPitch: TPunchPitch

  @Prop({ default: '' })
  size: string

  @Prop({ default: '' })
  thread: string

  @Prop({ default: '' })
  title: string

  @Prop({ default: EProductType.WATCH_STRAP })
  type: TProductType
}

export const ProductSchema = SchemaFactory.createForClass(Product)

export const ProductAlias = Product.name
