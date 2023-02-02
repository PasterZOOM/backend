import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { LoggerMiddleware } from 'src/common/middlewares/logger.middleware'

import { PersonsController } from './persons.controller'
import { PersonsService } from './persons.service'
import { Person, PersonSchema } from './schemas/person.schema'

@Module({
  imports: [MongooseModule.forFeature([{ name: Person.name, schema: PersonSchema }])],
  controllers: [PersonsController],
  providers: [PersonsService],
  exports: [PersonsService],
})
export class PersonsModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes(PersonsController)
  }
}
