import { Injectable } from '@nestjs/common'
import { CartTypeOrmInterface } from '../../interfaces/cart/cart-typeorm.interface'
import { CartEntity } from 'src/domain/cart/entities/cart.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { CartTypeOrmEntity } from '../../entities/cart/cart-typeorm.entity'
import { Repository } from 'typeorm'

@Injectable()
export class CartTypeOrmRepository implements CartTypeOrmInterface {
  constructor(
    @InjectRepository(CartTypeOrmEntity)
    private readonly cartRepository: Repository<CartTypeOrmEntity>,
  ) {}

  async deleteAll(accountId: number): Promise<void> {
    await this.cartRepository.delete({ accountId })
  }

  async save(cart: CartEntity) {
    const cartEntity = this.cartRepository.create(cart)
    return await this.cartRepository.save(cartEntity)
  }

  async findByAccountId(accountId: number) {
    return await this.cartRepository.find({
      where: { accountId },
      relations: ['product'],
    })
  }

  async updateQuantity(accountId: number, quantity: number, productId: number) {
    await this.cartRepository.update({ accountId, productId }, { quantity })
  }
  async deleteProduct(accountId: number, productId: number) {
    await this.cartRepository.delete({ accountId, productId })
  }
}
