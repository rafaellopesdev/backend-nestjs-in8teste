import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { OrdersEntity } from 'src/domain/orders/entities/orders.entity'
import { OrdersTypeOrmInterface } from '../../interfaces/orders/orders-typeorm.interface'
import { OrdersTypeOrmEntity } from '../../entities/oders/oders-typeorm.entity'

@Injectable()
export class OrdersTypeOrmRepository implements OrdersTypeOrmInterface {
  constructor(
    @InjectRepository(OrdersTypeOrmEntity)
    private readonly ordersRepository: Repository<OrdersTypeOrmEntity>,
  ) {}

  async save(order: OrdersEntity) {
    const newOrder = this.ordersRepository.create(order)
    return await this.ordersRepository.save(newOrder)
  }

  async findById(id: number) {
    return await this.ordersRepository.findOne({
      where: { id },
    })
  }
}
