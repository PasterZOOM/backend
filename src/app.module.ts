import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'

import { AddressesModule } from './modules/addresses/addresses.module'
import { BasicProductsModule } from './modules/basic-products/basic-products.module'
import { LeathersModule } from './modules/materials/leathers/leathers.module'
import { ThreadsModule } from './modules/materials/threads/threads.module'
import { OrdersModule } from './modules/orders/orders.module'
import { PersonsModule } from './modules/persons/persons.module'
import { ProductsModule } from './modules/products/products.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.DB_USER_NAME}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER}.iubgsyi.mongodb.net/?retryWrites=true&w=majority`,
      { dbName: 'pi_straps' }
    ),
    PersonsModule,
    AddressesModule,
    OrdersModule,
    ProductsModule,
    ThreadsModule,
    LeathersModule,
    BasicProductsModule,
  ],
})
export class AppModule {}
