import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { LeatherFactoriesController } from './leather-factories.controller'
import { LeatherFactoriesService } from './leather-factories.service'
import { LeatherFactoryAlias, LeatherFactorySchema } from './schemas/leather-factory.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: LeatherFactoryAlias, schema: LeatherFactorySchema }]),
  ],
  controllers: [LeatherFactoriesController],
  providers: [LeatherFactoriesService],
  exports: [LeatherFactoriesService],
})
export class LeatherFactoriesModule {}