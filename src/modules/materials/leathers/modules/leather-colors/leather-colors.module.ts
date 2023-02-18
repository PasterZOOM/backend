import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { LeatherArticlesModule } from '../leather-articles/leather-articles.module'

import { LeatherColorsController } from './leather-colors.controller'
import { LeatherColorsService } from './leather-colors.service'
import { LeatherColor, LeatherColorSchema } from './schemas/leather-color.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LeatherColor.name, schema: LeatherColorSchema }]),
    LeatherArticlesModule,
  ],
  controllers: [LeatherColorsController],
  providers: [LeatherColorsService],
  exports: [LeatherColorsService],
})
export class LeatherColorsModule {}
