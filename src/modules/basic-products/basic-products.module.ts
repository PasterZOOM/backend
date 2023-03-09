import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { LeatherColorsModule } from 'src/modules/materials/leathers/modules/leather-colors/leather-colors.module'

import { BasicProductsController } from './basic-products.controller'
import { BasicProductsService } from './basic-products.service'
import { BasicProductAlias, BasicProductSchema } from './schemas/basic-product.schema'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: BasicProductAlias, schema: BasicProductSchema }]),
    LeatherColorsModule,
  ],
  controllers: [BasicProductsController],
  providers: [BasicProductsService],
})
export class BasicProductsModule {}
