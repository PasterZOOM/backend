import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'
import { ILeatherColor } from 'src/modules/materials/leathers/modules/leather-colors/interfaces/leather-color.interface'

export type LeatherColorDocument = LeatherColor & Document

@Schema()
export class LeatherColor implements Omit<ILeatherColor, '_id'> {
  @Prop({ default: '' })
  article: string

  @Prop({ default: '' })
  code: string

  @Prop({ default: '' })
  color: string

  @Prop({ default: '' })
  description: string
}

export const LeatherColorSchema = SchemaFactory.createForClass(LeatherColor)
