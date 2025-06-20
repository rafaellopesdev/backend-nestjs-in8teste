import { Module } from '@nestjs/common'
import { DatabaseConfig } from 'src/infrastructure/persistence/typeorm/configs/database.config'
import { ProductsService } from './products.service'
import { ProductsController } from 'src/presentation/api/products/products.controller'

@Module({
  imports: [DatabaseConfig],
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
