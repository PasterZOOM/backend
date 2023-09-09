import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { getOrderNumber } from 'common/utils/string/getOrderNumber'

import { PersonsService } from '../persons/persons.service'

import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { OrderEntity } from './entities/order.entity'
import { OrderDateEntity } from './entities/orderDate.entity'
import { OrdersService } from './orders.service'

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly personsService: PersonsService
  ) {}

  @Post(':ownerId')
  async create(
    @Param('ownerId') ownerId: Types.ObjectId,
    @Query('deadline') deadline: Types.ObjectId,
    @Body() createOrderDto: Omit<CreateOrderDto, 'date' | 'number' | 'ownerId'> // TODO: удалить сумму, она будет рассчитываться исходя из стоимпости изделий
  ): Promise<OrderEntity> {
    try {
      const person = await this.personsService.findOne(ownerId)

      const number = getOrderNumber()

      const date: OrderDateEntity = {
        registration: new Date(),
        deadline: new Date(Date.now() + Number(deadline)),
        delivery: null,
        departure: null,
        finishProduction: null,
        startProduction: null,
      }

      const createdOrder = await this.ordersService.create({
        ...createOrderDto,
        ownerId,
        number,
        date,
      })

      await this.personsService.push(person._id, { orderIds: createdOrder._id })

      return createdOrder
    } catch (e) {}
  }

  @Get()
  async findAll(): Promise<OrderEntity[]> {
    return this.ordersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: Types.ObjectId): Promise<OrderEntity> {
    return this.ordersService.findOne(id)
  }

  @Patch(':id')
  update(
    @Param('id') id: Types.ObjectId,
    @Body() updateOrderDto: UpdateOrderDto
  ): Promise<OrderEntity> {
    return this.ordersService.update(id, updateOrderDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId): Promise<OrderEntity> {
    try {
      const order = await this.findOne(id)
      const owner = await this.personsService.findOne(order.ownerId)

      if (owner) {
        await this.personsService.pull(owner._id, { orderIds: id })
      }

      return this.ordersService.remove(id)
    } catch (e) {}
  }
}
