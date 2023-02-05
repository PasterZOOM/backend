import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { BadIdException } from 'src/common/exceptions/badId.Exceptions'
import { getOrderNumber } from 'src/common/utils/string/getOrderNumber'

import { PersonsService } from '../persons/persons.service'

import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { IOrder, IOrderDate } from './interfaces/order.interface'
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
    @Query('deadline') deadline: string,
    @Query('cost') cost: string,
    @Query('currency') currency: string,
    @Body() createOrderDto: Omit<CreateOrderDto, 'ownerId' | 'number' | 'date'> // TODO: удалить сумму, она будет рассчитываться исходя из стоимпости заказаов
  ): Promise<IOrder> {
    try {
      const person = await this.personsService.findOne(ownerId)

      const number = getOrderNumber()

      const date: IOrderDate = {
        registration: new Date(),
        deadline: new Date(Date.now() + +deadline),
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
    } catch (e) {
      throw new BadIdException('person', e)
    }
  }

  @Get()
  async findAll(): Promise<IOrder[]> {
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
  async remove(@Param('id') id: string): Promise<IOrder> {
    try {
      const order = await this.findOne(id)
      const owner = await this.personsService.findOne(order.ownerId)

      if (owner) {
        await this.personsService.pull(owner._id, { orderIds: id })
      }

      return this.ordersService.remove(id)
    } catch (e) {
      throw new BadIdException('address', e)
    }
  }
}
