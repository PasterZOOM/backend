import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { LeatherColorEntity } from '../entities/leather-color.entity'

export type LeatherColorDocument = LeatherColor & Document

@Schema()
export class LeatherColor implements Omit<LeatherColorEntity, '_id'> {
  @Prop({ default: '' })
  article: string

  @Prop({ default: '' })
  code: string

  @Prop({ default: '' })
  name: string

  @Prop({ default: '' })
  description: string
}

export const LeatherColorSchema = SchemaFactory.createForClass(LeatherColor)
