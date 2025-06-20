import { OrdersTypeOrmRepository } from 'src/infrastructure/persistence/typeorm/repositories/orders/orders-typeorm.repository'
import { CreateOrdersDTO } from 'src/presentation/api/orders/dto/create-orders.dto'
import { OrdersEntity } from './entities/orders.entity'
import { Injectable } from '@nestjs/common'
import { ExceptionInUseCase } from 'src/infrastructure/utils/exception/exeption-in-use-case.exception'
import { ProductsTypeOrmRepository } from 'src/infrastructure/persistence/typeorm/repositories/products/products-typeorm.repository'
import { AccountsTypeOrmRepository } from 'src/infrastructure/persistence/typeorm/repositories/accounts/accounts-typeorm.repository'

@Injectable()
export class OrdersServices {
  constructor(
    private readonly ordersRepository: OrdersTypeOrmRepository,
    private readonly productsRepository: ProductsTypeOrmRepository,
    private readonly accountsRepository: AccountsTypeOrmRepository,
  ) {}

  async createOrder(order: CreateOrdersDTO, accountId: number) {
    const newOrder: OrdersEntity = {
      accountId,
      productsIds: order.productsIds,
      phone: order.phone,
      street: order.street,
      number: order.number,
      neighborhood: order.neighborhood,
      zipCode: order.zipCode,
      city: order.city,
      state: order.state,
      stateName: order.stateName,
      observation: order.observation,
      total: order.total,
      status: 'pending',
    }

    const savedOrder = await this.ordersRepository.save(newOrder)

    return {
      message: 'Pedido criado com sucesso',
      orderId: savedOrder.id,
    }
  }

  async getOrderById(id: number) {
    const order = await this.ordersRepository.findById(id)

    if (order?.id === undefined) {
      throw new ExceptionInUseCase('Pedido não encontrado', 404)
    }

    const findOrderItens = await this.productsRepository.findByIds(
      order.productsIds.map(item => item.id),
    )

    const items = findOrderItens.map(item => {
      const price = Number(item.price) || 0
      const discount = item.hasDiscount ? Number(item.discountValue) || 0 : 0
      const finalPrice = price * (1 - discount)

      const productInOrder = order.productsIds.find(prod => prod.id === item.id)
      const quantity = productInOrder?.quantity || 1

      return {
        id: item.id,
        name: item.name,
        description: item.description,
        price: finalPrice,
        hasDiscount: item.hasDiscount,
        gallery: item.gallery,
        discountValue: item.discountValue,
        details: item.details,
        quantity,
      }
    })

    const accountInfo = await this.accountsRepository.findById(order.accountId)

    const customer = {
      name: accountInfo?.name,
      email: accountInfo?.email,
      phone: order.phone,
      street: order.street,
      number: order.number,
      neighborhood: order.neighborhood,
      zipcode: order.zipCode,
      city: order.city,
      state: order.state,
      stateName: order.stateName,
      observation: order.observation,
      address: `${order.street}, ${order.number}, ${order.neighborhood}, ${order.city} - ${order.stateName}, CEP: ${order.zipCode}`,
    }

    return {
      order: {
        id: order.id,
        items,
        customer,
        total: order.total,
        status: order.status,
        createdAt: order.createdAt,
      },
    }
  }
}
