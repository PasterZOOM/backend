import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { LeathersController } from './leathers.controller'
import { LeathersService } from './leathers.service'
import { LeatherArticlesModule } from './modules/leather-articles/leather-articles.module'
import { LeatherColorsModule } from './modules/leather-colors/leather-colors.module'
import { LeatherFactoriesModule } from './modules/leather-factories/leather-factories.module'
import { LeatherAlias, LeatherSchema } from './schemas/leather.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LeatherAlias, schema: LeatherSchema }]),
    LeatherFactoriesModule,
    LeatherArticlesModule,
    LeatherColorsModule,
  ],
  controllers: [LeathersController],
  providers: [LeathersService],
})
export class LeathersModule {}
