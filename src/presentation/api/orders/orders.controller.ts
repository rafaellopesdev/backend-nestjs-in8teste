import { Body, Controller, Get, Param, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { OrdersServices } from 'src/domain/orders/orders.service'
import { CreateOrdersDTO } from './dto/create-orders.dto'
import { DecodedToken, User } from 'src/infrastructure/utils/decode-token.utils'

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersServices) {}

  @Post('create')
  async createOrder(
    @Body() createOrdersDTO: CreateOrdersDTO,
    @User() user: DecodedToken,
  ) {
    return {
      content: await this.ordersService.createOrder(createOrdersDTO, user.id),
    }
  }

  @Get(':id')
  async getOrder(@Param('id') id: number) {
    return {
      content: await this.ordersService.getOrderById(id),
    }
  }
}
