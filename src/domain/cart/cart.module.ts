import { Module } from '@nestjs/common'
import { DatabaseConfig } from 'src/infrastructure/persistence/typeorm/configs/database.config'
import { CartService } from './cart.service'
import { CartController } from 'src/presentation/api/cart/cart.controller'

@Module({
  imports: [DatabaseConfig],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
