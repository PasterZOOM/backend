import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { OrderEntity } from 'modules/orders/entities/order.entity'

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

  async findOne(id: Types.ObjectId): Promise<OrderEntity> {
    return this.OrderModel.findById(id)
  }

  async update(id: Types.ObjectId, updateOrderDto: UpdateOrderDto): Promise<OrderEntity> {
    await this.OrderModel.findByIdAndUpdate(id, updateOrderDto)

    return this.findOne(id)
  }

  async remove(id: Types.ObjectId): Promise<OrderEntity> {
    return this.OrderModel.findByIdAndRemove(id)
  }
}
