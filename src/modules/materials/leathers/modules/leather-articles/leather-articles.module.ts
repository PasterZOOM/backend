import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { BasicProductsModule } from '../../../../basic-products/basic-products.module'
import { LeatherColorsModule } from '../leather-colors/leather-colors.module'
import { LeatherFactoriesModule } from '../leather-factories/leather-factories.module'

import { LeatherArticlesController } from './leather-articles.controller'
import { LeatherArticlesService } from './leather-articles.service'
import { LeatherArticleAlias, LeatherArticleSchema } from './schemas/leather-article.schema'

@Module({
  imports: [
    forwardRef(() => LeatherColorsModule),
    forwardRef(() => LeatherFactoriesModule),
    forwardRef(() => BasicProductsModule),
    MongooseModule.forFeature([{ name: LeatherArticleAlias, schema: LeatherArticleSchema }]),
  ],
  controllers: [LeatherArticlesController],
  providers: [LeatherArticlesService],
  exports: [LeatherArticlesService],
})
export class LeatherArticlesModule {}
