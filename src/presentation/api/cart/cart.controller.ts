import { Body, Controller, Delete, Get, Post, Put } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { CartService } from 'src/domain/cart/cart.service'
import { DecodedToken, User } from 'src/infrastructure/utils/decode-token.utils'
import { AddToCartDTO } from './dtos/add-to-cart.dto'
import { UpdateQuantityCartDTO } from './dtos/update-quantity-cart.dto'
import { DeleteProductCartDTO } from './dtos/delete-product-cart.dto'

@ApiTags('Cart')
@Controller('cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiBearerAuth()
  @Get('/list')
  async getCart(@User() user: DecodedToken) {
    return {
      content: await this.cartService.getCart(user.id),
    }
  }

  @ApiBearerAuth()
  @Post('/add')
  async addToCart(
    @Body() addToCartDto: AddToCartDTO,
    @User() user: DecodedToken,
  ) {
    return {
      content: await this.cartService.addToCart(
        user.id,
        addToCartDto.productId,
      ),
    }
  }

  @ApiBearerAuth()
  @Put('/update-quantity')
  async updateQuantityCart(
    @Body() updateQuantityCartDTO: UpdateQuantityCartDTO,
    @User() user: DecodedToken,
  ) {
    return {
      content: await this.cartService.updateQuantity(
        updateQuantityCartDTO,
        user.id,
      ),
    }
  }

  @ApiBearerAuth()
  @Delete('/delete-product')
  async deleteProduct(
    @Body() deleteProductCartDTO: DeleteProductCartDTO,
    @User() user: DecodedToken,
  ) {
    return {
      content: await this.cartService.deleteProduct(
        user.id,
        deleteProductCartDTO.productId,
      ),
    }
  }

  @ApiBearerAuth()
  @Post('/clear')
  async clearCart(@User() user: DecodedToken) {
    return {
      content: await this.cartService.clearCart(user.id),
    }
  }
}
