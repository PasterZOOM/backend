import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { LeatherFactoriesModule } from '../leather-factories/leather-factories.module'

import { LeatherArticlesController } from './leather-articles.controller'
import { LeatherArticlesService } from './leather-articles.service'
import { LeatherArticleAlias, LeatherArticleSchema } from './schemas/leather-article.schema'

@Module({
  imports: [
    LeatherFactoriesModule,
    MongooseModule.forFeature([{ name: LeatherArticleAlias, schema: LeatherArticleSchema }]),
  ],
  controllers: [LeatherArticlesController],
  providers: [LeatherArticlesService],
  exports: [LeatherArticlesService],
})
export class LeatherArticlesModule {}
