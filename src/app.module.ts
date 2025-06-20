import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SwaggerConfigModule } from './infrastructure/utils/swagger.utils'
import { DatabaseConfig } from './infrastructure/persistence/typeorm/configs/database.config'
import { ProductsModule } from './domain/products/products.module'
import { AccountsModule } from './domain/accounts/accounts.module'
import { AuthModule } from './domain/auth/auth.module'
import { CartModule } from './domain/cart/cart.module'
import { OrdersModule } from './domain/orders/orders.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SwaggerConfigModule,
    DatabaseConfig,
    ProductsModule,
    AccountsModule,
    AuthModule,
    CartModule,
    OrdersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
