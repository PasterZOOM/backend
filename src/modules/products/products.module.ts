import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { ProductsController } from './products.controller'
import { ProductsService } from './products.service'
import { ProductAlias, ProductSchema } from './schemas/product.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: ProductAlias, schema: ProductSchema }])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
