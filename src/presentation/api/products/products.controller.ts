import { Controller, Get, Query } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { ProductsService } from 'src/domain/products/products.service'
import { FindAllProductsDTO } from './dtos/find-all-products.dto'

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/find-all')
  async findAll(@Query() options: FindAllProductsDTO) {
    return { content: await this.productsService.findAll(options) }
  }
}
