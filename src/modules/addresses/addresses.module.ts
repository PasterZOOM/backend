import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { PersonsModule } from '../persons/persons.module'

import { AddressesController } from './addresses.controller'
import { AddressesService } from './addresses.service'
import { Address, AddressSchema } from './schemas/address.schema'

@Module({
  imports: [
    PersonsModule,
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
  ],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
