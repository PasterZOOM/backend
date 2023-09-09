import { forwardRef, Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { BasicProductsModule } from 'modules/basic-products/basic-products.module'
import { LeatherColorsModule } from 'modules/materials/leathers/modules/leather-colors/leather-colors.module'

import { LeatherArticlesModule } from '../leather-articles/leather-articles.module'

import { LeatherFactoriesController } from './leather-factories.controller'
import { LeatherFactoriesService } from './leather-factories.service'
import { LeatherFactoryAlias, LeatherFactorySchema } from './schemas/leather-factory.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LeatherFactoryAlias, schema: LeatherFactorySchema }]),
    forwardRef(() => LeatherArticlesModule),
    forwardRef(() => LeatherColorsModule),
    forwardRef(() => BasicProductsModule),
  ],
  controllers: [LeatherFactoriesController],
  providers: [LeatherFactoriesService],
  exports: [LeatherFactoriesService],
})
export class LeatherFactoriesModule {}
