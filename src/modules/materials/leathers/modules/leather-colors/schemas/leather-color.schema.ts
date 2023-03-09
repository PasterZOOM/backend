import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { LeatherColorEntity } from '../entities/leather-color.entity'
import { ELeatherColor } from '../entities/leather-colors.type'

export type LeatherColorDocument = LeatherColor & Document

@Schema()
export class LeatherColor implements Omit<LeatherColorEntity, '_id'> {
  @Prop({ default: '' })
  article: string

  @Prop({ default: '' })
  code: string

  @Prop({ default: '' })
  photo: string

  @Prop({ default: '' })
  title: string

  @Prop({ default: ELeatherColor.BLACK })
  value: ELeatherColor

  @Prop({ default: '' })
  description: string
}

export const LeatherColorSchema = SchemaFactory.createForClass(LeatherColor)

export const LeatherColorAlias = LeatherColor.name
