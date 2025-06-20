import { OrdersEntity } from 'src/domain/orders/entities/orders.entity'

export interface OrdersTypeOrmInterface {
  save(order: OrdersEntity)
  findById(id: number)
}
