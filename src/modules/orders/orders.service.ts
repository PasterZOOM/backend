import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { IOrder } from './interfaces/order.interface'
import { Order, OrderDocument } from './schemas/order.schema'

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private OrderModel: Model<OrderDocument>) {}

  async create(createOrderDto: CreateOrderDto): Promise<IOrder> {
    const newOrder = new this.OrderModel(createOrderDto)

    return newOrder.save()
  }

  async findAll(): Promise<IOrder[]> {
    return this.OrderModel.find().sort().exec()
  }

  async findOne(id: string): Promise<IOrder> {
    return this.OrderModel.findById(id)
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<IOrder> {
    return this.OrderModel.findByIdAndUpdate(id, updateOrderDto)
  }

  async remove(id: string): Promise<IOrder> {
    return this.OrderModel.findByIdAndRemove(id)
  }
}
