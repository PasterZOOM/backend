import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductEntity } from './entities/product.entity'
import { ProductAlias, ProductDocument } from './schemas/product.schema'

@Injectable()
export class ProductsService {
  constructor(@InjectModel(ProductAlias) private ProductModel: Model<ProductDocument>) {}

  async create(createProductDto: CreateProductDto): Promise<ProductEntity> {
    const newPerson = new this.ProductModel(createProductDto)

    return newPerson.save()
  }

  async findAll(): Promise<ProductEntity[]> {
    return this.ProductModel.find().sort().exec()
  }

  async findOne(id: string): Promise<ProductEntity> {
    return this.ProductModel.findById(id)
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<ProductEntity> {
    await this.ProductModel.findByIdAndUpdate(id, updateProductDto)

    return this.findOne(id)
  }

  async remove(id: string): Promise<ProductEntity> {
    return this.ProductModel.findByIdAndRemove(id)
  }
}
