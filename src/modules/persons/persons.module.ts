import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { PersonsController } from './persons.controller'
import { PersonsService } from './persons.service'
import { PersonAlias, PersonSchema } from './schemas/person.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: PersonAlias, schema: PersonSchema }])],
  controllers: [PersonsController],
  providers: [PersonsService],
  exports: [PersonsService],
})
export class PersonsModule {}
