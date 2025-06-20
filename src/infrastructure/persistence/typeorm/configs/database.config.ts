import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'
import { TypeOrmConfig } from './typeorm.config'
import { ProductsTypeOrmEntity } from '../entities/products/products-typeorm.entity'
import { ProductsTypeOrmRepository } from '../repositories/products/products-typeorm.repository'
import { AccountsTypeormEntity } from '../entities/accounts/accounts-typeorm.entity'
import { AccountsTypeOrmRepository } from '../repositories/accounts/accounts-typeorm.repository'
import { CartTypeOrmEntity } from '../entities/cart/cart-typeorm.entity'
import { CartTypeOrmRepository } from '../repositories/cart/cart-typeorm.repository'
import { OrdersTypeOrmEntity } from '../entities/oders/oders-typeorm.entity'
import { OrdersTypeOrmRepository } from '../repositories/orders/orders-typeorm.repository'

@Module({
  imports: [
    TypeOrmConfig,
    TypeOrmModule.forFeature([
      ProductsTypeOrmEntity,
      AccountsTypeormEntity,
      CartTypeOrmEntity,
      OrdersTypeOrmEntity,
    ]),
  ],
  providers: [
    ProductsTypeOrmRepository,
    AccountsTypeOrmRepository,
    CartTypeOrmRepository,
    OrdersTypeOrmRepository,
  ],
  exports: [
    ProductsTypeOrmRepository,
    AccountsTypeOrmRepository,
    CartTypeOrmRepository,
    OrdersTypeOrmRepository,
  ],
})
export class DatabaseConfig {}
