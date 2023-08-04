import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, SchemaTypes, Types } from 'mongoose'
import { LocaleFieldEntity } from 'src/common/entities/locale-field.entity'

import { LeatherColorEntity } from '../entities/leather-color.entity'
import { ELeatherColor } from '../entities/leather-colors.type'

export type LeatherColorDocument = Document & LeatherColor

@Schema()
export class LeatherColor implements Omit<LeatherColorEntity, '_id'> {
  @Prop({ type: SchemaTypes.ObjectId, default: '' })
  article: Types.ObjectId

  @Prop({ type: SchemaTypes.ObjectId, default: '' })
  factory: Types.ObjectId

  @Prop({ default: '' })
  code: string

  @Prop({ default: '' })
  photo: string

  @Prop({ default: {} })
  title: LocaleFieldEntity

  @Prop({ default: ELeatherColor.BLACK })
  value: ELeatherColor

  @Prop({ default: {} })
  description: LocaleFieldEntity
}

export const LeatherColorSchema = SchemaFactory.createForClass(LeatherColor)

export const LeatherColorAlias = LeatherColor.name
