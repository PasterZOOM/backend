import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { Address, AddressSchema } from 'src/addresses/schemas/address.schema'
import { PersonsModule } from 'src/persons/persons.module'

import { AddressesController } from './addresses.controller'
import { AddressesService } from './addresses.service'

@Module({
  imports: [
    PersonsModule,
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
  ],
  controllers: [AddressesController],
  providers: [AddressesService],
})
export class AddressesModule {}
