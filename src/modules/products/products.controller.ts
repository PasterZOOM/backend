import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { Types } from 'mongoose'
import { ProductEntity } from 'modules/products/entities/product.entity'

import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { ProductsService } from './products.service'

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(@Body() createProductDto: CreateProductDto): Promise<ProductEntity> {
    return this.productsService.create(createProductDto)
  }

  @Get()
  async findAll(): Promise<ProductEntity[]> {
    return this.productsService.findAll()
  }

  @Get(':id')
  async findOne(@Param('id') id: Types.ObjectId): Promise<ProductEntity> {
    return this.productsService.findOne(id)
  }

  @Patch(':id')
  async update(
    @Param('id') id: Types.ObjectId,
    @Body() updateProductDto: UpdateProductDto
  ): Promise<ProductEntity> {
    return this.productsService.update(id, updateProductDto)
  }

  @Delete(':id')
  async remove(@Param('id') id: Types.ObjectId): Promise<ProductEntity> {
    return this.productsService.remove(id)
  }
}
