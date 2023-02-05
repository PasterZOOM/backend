import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document } from 'mongoose'

import { IThread } from '../interfaces/thread.interface'

export type ThreadDocument = Thread & Document

@Schema()
export class Thread implements Omit<IThread, '_id'> {
  @Prop({ default: '' })
  color: string

  @Prop({ default: '' })
  colorCode: string

  @Prop({ default: '' })
  manufacturer: string

  @Prop({ default: '' })
  photo: string

  @Prop({ default: '' })
  thickness: string

  @Prop({ default: '' })
  thicknessCode: string
}

export const ThreadSchema = SchemaFactory.createForClass(Thread)
