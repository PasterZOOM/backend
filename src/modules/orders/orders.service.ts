import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import { OrderEntity } from 'src/modules/orders/entities/order.entity'

import { CreateOrderDto } from './dto/create-order.dto'
import { UpdateOrderDto } from './dto/update-order.dto'
import { Order, OrderDocument } from './schemas/order.schema'

@Injectable()
export class OrdersService {
  constructor(@InjectModel(Order.name) private OrderModel: Model<OrderDocument>) {}

  async create(createOrderDto: CreateOrderDto): Promise<OrderEntity> {
    const newOrder = new this.OrderModel(createOrderDto)

    return newOrder.save()
  }

  async findAll(): Promise<OrderEntity[]> {
    return this.OrderModel.find().sort().exec()
  }

  async findOne(id: string): Promise<OrderEntity> {
    return this.OrderModel.findById(id)
  }

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<OrderEntity> {
    await this.OrderModel.findByIdAndUpdate(id, updateOrderDto)

    return this.findOne(id)
  }

  async remove(id: string): Promise<OrderEntity> {
    return this.OrderModel.findByIdAndRemove(id)
  }
}
