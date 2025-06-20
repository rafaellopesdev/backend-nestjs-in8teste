import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm'
import { AccountsTypeormEntity } from '../accounts/accounts-typeorm.entity'

@Entity({ name: 'orders' })
export class OrdersTypeOrmEntity {
  @PrimaryGeneratedColumn('increment')
  id: number

  @Column({ name: 'account_id' })
  accountId: number

  @Column({ type: 'jsonb', name: 'products_ids' })
  productsIds: { id: number; quantity: number }[]

  @Column({ type: 'bigint' })
  phone: number

  @Column()
  street: string

  @Column()
  number: number

  @Column()
  neighborhood: string

  @Column({ name: 'zip_code' })
  zipCode: string

  @Column()
  city: string

  @Column()
  state: string

  @Column({ name: 'state_name' })
  stateName: string

  @Column({ type: 'text', nullable: true })
  observation?: string

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total: number

  @Column()
  status: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date

  @ManyToOne(() => AccountsTypeormEntity, { eager: false })
  @JoinColumn({ name: 'account_id' })
  account: AccountsTypeormEntity
}
