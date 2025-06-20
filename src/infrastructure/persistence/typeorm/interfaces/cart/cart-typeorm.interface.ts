import { CartEntity } from 'src/domain/cart/entities/cart.entity'

export interface CartTypeOrmInterface {
  save(cart: CartEntity)
  findByAccountId(accountId: number)
  updateQuantity(accountId: number, quantity: number, productId: number)
  deleteProduct(accountId: number, productId: number)
  deleteAll(accountId: number)
}
