import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { LeatherFactoriesModule } from '../leather-factories/leather-factories.module'

import { LeatherArticlesController } from './leather-articles.controller'
import { LeatherArticlesService } from './leather-articles.service'
import { LeatherArticle, LeatherArticleSchema } from './schemas/leather-article.schema'

@Module({
  imports: [
    LeatherFactoriesModule,
    MongooseModule.forFeature([{ name: LeatherArticle.name, schema: LeatherArticleSchema }]),
  ],
  controllers: [LeatherArticlesController],
  providers: [LeatherArticlesService],
  exports: [LeatherArticlesService],
})
export class LeatherArticlesModule {}
