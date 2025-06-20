import { Module } from '@nestjs/common'
import { DatabaseConfig } from 'src/infrastructure/persistence/typeorm/configs/database.config'
import { AccountsController } from 'src/presentation/api/accounts/accounts.controller'
import { AccountsService } from './accounts.services'

@Module({
  imports: [DatabaseConfig],
  controllers: [AccountsController],
  providers: [AccountsService],
})
export class AccountsModule {}
