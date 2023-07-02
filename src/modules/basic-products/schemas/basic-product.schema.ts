import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes, Types } from 'mongoose'
import { LocaleFieldEntity } from 'src/common/entities/locale-field.entity'
import { ECost } from 'src/common/interfaces/cost.type'
import { PhotosEntity } from 'src/modules/basic-products/entities/photo.entity'
import { EProductAssignment, EProductCategory } from 'src/modules/products/entities/product.type'

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

  @Prop({ type: SchemaTypes.ObjectId, default: '' })
  leather: Types.ObjectId

  @Prop({ default: EPunchPitch.LITTLE })
  punchPitch: EPunchPitch

  @Prop({ default: ECost.EUR })
  costCurrency: ECost

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
