import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { LeatherArticlesModule } from '../leather-articles/leather-articles.module'

import { LeatherColorsController } from './leather-colors.controller'
import { LeatherColorsService } from './leather-colors.service'
import { LeatherColorAlias, LeatherColorSchema } from './schemas/leather-color.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LeatherColorAlias, schema: LeatherColorSchema }]),
    forwardRef(() => LeatherArticlesModule),
  ],
  controllers: [LeatherColorsController],
  providers: [LeatherColorsService],
  exports: [LeatherColorsService],
})
export class LeatherColorsModule {}
