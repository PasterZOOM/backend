import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { LeatherArticlesModule } from '../materials/leathers/modules/leather-articles/leather-articles.module'
import { LeatherColorsModule } from '../materials/leathers/modules/leather-colors/leather-colors.module'

import { BasicProductsController } from './basic-products.controller'
import { BasicProductsService } from './basic-products.service'
import { BasicProductAlias, BasicProductSchema } from './schemas/basic-product.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BasicProductAlias, schema: BasicProductSchema }]),
    forwardRef(() => LeatherColorsModule),
    forwardRef(() => LeatherArticlesModule),
  ],
  controllers: [BasicProductsController],
  providers: [BasicProductsService],
})
export class BasicProductsModule {}
