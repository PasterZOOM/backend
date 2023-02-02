import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { IOrder } from 'src/modules/orders/interfaces/order.interface'

import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { OrdersService } from './orders.service'

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto): Promise<IOrder> {
    return this.ordersService.create(createOrderDto)
  }

  @Get()
  findAll(): Promise<IOrder[]> {
    return this.ordersService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<IOrder> {
    return this.ordersService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto): Promise<IOrder> {
    return this.ordersService.update(+id, updateOrderDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<IOrder> {
    return this.ordersService.remove(+id)
  }
}
