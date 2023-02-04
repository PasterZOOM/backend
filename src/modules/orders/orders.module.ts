import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

import { PersonsModule } from '../persons/persons.module'

import { OrdersController } from './orders.controller'
import { OrdersService } from './orders.service'
import { Order, OrderSchema } from './schemas/order.schema'

@Module({
  imports: [PersonsModule, MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }])],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
