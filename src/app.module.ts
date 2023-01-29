import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { AddressesModule } from './addresses/addresses.module'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { PersonsModule } from './persons/persons.module'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017', { dbName: 'Pi_Straps' }),
    PersonsModule,
    AddressesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
