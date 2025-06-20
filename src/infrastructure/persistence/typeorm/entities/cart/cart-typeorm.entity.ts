import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm'
import { ProductsTypeOrmEntity } from '../products/products-typeorm.entity'
import { AccountsTypeormEntity } from '../accounts/accounts-typeorm.entity'

@Entity('carts')
export class CartTypeOrmEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ name: 'product_id', type: 'int' })
  productId: number

  @Column({ name: 'account_id', type: 'int' })
  accountId: number

  @Column({ type: 'int' })
  quantity: number

  @UpdateDateColumn({
    name: 'updated_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date

  @UpdateDateColumn({
    name: 'created_at',
    type: 'timestamptz',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date

  @ManyToOne(() => ProductsTypeOrmEntity, { eager: false })
  @JoinColumn({ name: 'product_id' })
  product: ProductsTypeOrmEntity

  @ManyToOne(() => AccountsTypeormEntity, { eager: false })
  @JoinColumn({ name: 'account_id' })
  account: AccountsTypeormEntity
}
