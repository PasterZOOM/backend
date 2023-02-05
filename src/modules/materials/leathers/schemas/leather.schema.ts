import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { ILeather } from '../interfaces/leather.interface'

export type LeatherDocument = Leather & Document

@Schema()
export class Leather implements Omit<ILeather, '_id'> {
  @Prop({ default: '' })
  article: string

  @Prop({ default: '' })
  color: string

  @Prop({ default: '' })
  factory: string

  @Prop({ default: '' })
  thickness: string
}

export const LeatherSchema = SchemaFactory.createForClass(Leather)
