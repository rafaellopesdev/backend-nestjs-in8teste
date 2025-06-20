import { Module } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from 'src/presentation/api/auth/auth.controller'
import { DatabaseConfig } from 'src/infrastructure/persistence/typeorm/configs/database.config'

@Module({
  imports: [DatabaseConfig],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
