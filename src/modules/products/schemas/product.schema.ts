import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes, Types } from 'mongoose'
import { CostEntity } from 'src/common/interfaces/cost.entity'

import { EPunchPitch, TPunchPitch } from '../../materials/common/materials.type'
import { ProductEntity } from '../entities/product.entity'
import { EProductCategory, TProductAssignment, TProductCategory } from '../entities/product.type'

export type ProductDocument = Product & Document

@Schema()
export class Product implements Omit<ProductEntity, '_id'> {
  @Prop({ type: [String] })
  category: TProductAssignment[]

  @Prop({ default: '' })
  comment: string

  @Prop({ type: () => CostEntity })
  cost: CostEntity

  @Prop({ default: '' })
  description: string

  @Prop({ type: SchemaTypes.ObjectId, default: '' })
  leather: Types.ObjectId

  @Prop({ type: SchemaTypes.ObjectId, default: '' })
  orderId: Types.ObjectId

  @Prop({ default: '' })
  photo: string

  @Prop({ default: EPunchPitch.LITTLE })
  punchPitch: TPunchPitch

  @Prop({ default: '' })
  size: string

  @Prop({ type: SchemaTypes.ObjectId, default: '' })
  thread: Types.ObjectId

  @Prop({ default: '' })
  title: string

  @Prop({ default: EProductCategory.WATCH_STRAP })
  type: TProductCategory
}

export const ProductSchema = SchemaFactory.createForClass(Product)

export const ProductAlias = Product.name
