import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { BasicProductsController } from './basic-products.controller'
import { BasicProductsService } from './basic-products.service'
import { BasicProductAlias, BasicProductSchema } from './schemas/basic-product.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: BasicProductAlias, schema: BasicProductSchema }])],
  controllers: [BasicProductsController],
  providers: [BasicProductsService],
})
export class BasicProductsModule {}
