import { Injectable } from '@nestjs/common'
import { CartTypeOrmRepository } from 'src/infrastructure/persistence/typeorm/repositories/cart/cart-typeorm.repository'
import { UpdateQuantityCartDTO } from 'src/presentation/api/cart/dtos/update-quantity-cart.dto'

@Injectable()
export class CartService {
  constructor(private readonly cartRepository: CartTypeOrmRepository) {}

  async getCart(accountId: number) {
    const cartItems = await this.cartRepository.findByAccountId(accountId)

    if (!cartItems || cartItems.length === 0) {
      return {
        userId: accountId,
        items: [],
      }
    }

    const formattedItems = cartItems.map(cartItem => {
      const { product } = cartItem
      const price = Number(product.price) || 0
      const discount = product.hasDiscount
        ? Number(product.discountValue) || 0
        : 0

      const finalPrice = price * (1 - discount)

      return {
        ...product,
        price: finalPrice,
        quantity: cartItem.quantity,
      }
    })

    return {
      userId: accountId,
      items: formattedItems,
    }
  }

  async addToCart(accountId: number, productId: number) {
    await this.cartRepository.save({
      accountId,
      productId,
      quantity: 1,
    })

    return await this.getCart(accountId)
  }

  async updateQuantity(
    updateQuantityCartDTO: UpdateQuantityCartDTO,
    accountId: number,
  ) {
    await this.cartRepository.updateQuantity(
      accountId,
      updateQuantityCartDTO.quantity,
      updateQuantityCartDTO.productId,
    )
    return await this.getCart(accountId)
  }

  async deleteProduct(accountId: number, productId: number) {
    await this.cartRepository.deleteProduct(accountId, productId)
    return await this.getCart(accountId)
  }

  async clearCart(accountId: number) {
    await this.cartRepository.deleteAll(accountId)
    return { items: [] }
  }
}
