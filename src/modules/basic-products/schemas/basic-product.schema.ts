import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { LocaleFieldEntity } from 'common/entities/locale-field.entity'
import { BasicProductLeather } from 'modules/basic-products/entities/basic-product-leather.entity'
import { PhotosEntity } from 'modules/basic-products/entities/photo.entity'
import { EProductAssignment, EProductCategory } from 'modules/products/entities/product.type'

import { EPunchPitch } from '../../materials/common/materials.type'
import { BasicProductEntity } from '../entities/basic-product.entity'

export type BasicProductDocument = BasicProduct & Document

@Schema()
export class BasicProduct implements Omit<BasicProductEntity, '_id'> {
  @Prop({ type: [String], default: [] })
  assignments: EProductAssignment[]

  @Prop({ type: Number })
  cost: number

  @Prop({ default: {} })
  description: LocaleFieldEntity

  @Prop({ type: BasicProductLeather, default: '' })
  leather: BasicProductLeather

  @Prop({ default: EPunchPitch.LITTLE })
  punchPitch: EPunchPitch

  @Prop({ default: {} })
  size: LocaleFieldEntity

  @Prop({ default: {} })
  title: LocaleFieldEntity

  @Prop({ default: EProductCategory.WATCH_STRAP })
  category: EProductCategory

  @Prop({ type: PhotosEntity, default: {} })
  photos: PhotosEntity

  @Prop({ default: false })
  isPublished: boolean
}

export const BasicProductSchema = SchemaFactory.createForClass(BasicProduct)

export const BasicProductAlias = BasicProduct.name
