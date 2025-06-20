import { Module } from '@nestjs/common'
import { DatabaseConfig } from 'src/infrastructure/persistence/typeorm/configs/database.config'
import { OrdersServices } from './orders.service'
import { OrdersController } from 'src/presentation/api/orders/orders.controller'

@Module({
  imports: [DatabaseConfig],
  controllers: [OrdersController],
  providers: [OrdersServices],
})
export class OrdersModule {}
