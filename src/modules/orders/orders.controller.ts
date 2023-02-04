import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { BadIdException } from 'src/common/exceptions/badId.Exceptions'
import { getOrderNumber } from 'src/common/utils/string/getOrderNumber'

import { PersonsService } from '../persons/persons.service'

import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { IOrder } from './interfaces/order.interface'
import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly personsService: PersonsService
  ) {}

  @Post(':ownerId')
  async create(
    @Param('ownerId') ownerId: string,
    @Body() createOrderDto: Omit<CreateOrderDto, 'ownerId' | 'number'>
  ): Promise<IOrder> {
    try {
      const person = await this.personsService.findOne(ownerId)

      const number = getOrderNumber()

      const createdOrder = await this.ordersService.create({ ...createOrderDto, ownerId, number })

      await this.personsService.push(person._id, { orderIds: createdOrder._id })

      return createdOrder
    } catch (e) {
      throw new BadIdException('person', e)
    }
  }

  @Get()
  findAll(): Promise<IOrder[]> {
    return this.ordersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IOrder> {
    return this.ordersService.findOne(id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<IOrder> {
    return this.ordersService.update(id, updateOrderDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IOrder> {
    return this.ordersService.remove(id)
  }
}
