import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ECost } from 'src/common/interfaces/cost.type'
import { EProductAssignment, EProductCategory } from 'src/modules/products/entities/product.type'

import { EPunchPitch } from '../../materials/common/materials.type'
import { BasicProductEntity } from '../entities/basic-product.entity'
import { PhotosType } from '../entities/basic-product.type'

export type BasicProductDocument = BasicProduct & Document

@Schema()
export class BasicProduct implements Omit<BasicProductEntity, '_id'> {
  @Prop({ type: [String], default: [] })
  assignments: EProductAssignment[]

  @Prop({ default: '' })
  comment: string

  @Prop({ type: Number })
  cost: number

  @Prop({ default: '' })
  description: string

  @Prop({ default: '' })
  leather: string

  @Prop({ default: EPunchPitch.LITTLE })
  punchPitch: EPunchPitch

  @Prop({ default: ECost.EUR })
  costCurrency: ECost

  @Prop({ default: '' })
  size: string

  @Prop({ default: '' })
  title: string

  @Prop({ default: EProductCategory.WATCH_STRAP })
  category: EProductCategory

  @Prop({ type: Object })
  photos: PhotosType
}

export const BasicProductSchema = SchemaFactory.createForClass(BasicProduct)

export const BasicProductAlias = BasicProduct.name
