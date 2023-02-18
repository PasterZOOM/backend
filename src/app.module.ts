import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AddressesModule } from './modules/addresses/addresses.module'
import { LeathersModule } from './modules/materials/leathers/leathers.module'
import { ThreadsModule } from './modules/materials/threads/threads.module'
import { OrdersModule } from './modules/orders/orders.module'
import { PersonsModule } from './modules/persons/persons.module'
import { ProductsModule } from './modules/products/products.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', { dbName: 'Pi_Straps' }),
    PersonsModule,
    AddressesModule,
    OrdersModule,
    ProductsModule,
    ThreadsModule,
    LeathersModule,
  ],
})
export class AppModule {}
