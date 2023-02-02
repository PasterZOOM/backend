import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { AddressesModule } from './modules/addresses/addresses.module'
import { OrdersModule } from './modules/orders/orders.module'
import { PersonsModule } from './modules/persons/persons.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', { dbName: 'Pi_Straps' }),
    PersonsModule,
    AddressesModule,
    OrdersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
