import { AccountsTypeOrmRepository } from 'src/infrastructure/persistence/typeorm/repositories/accounts/accounts-typeorm.repository'
import { ExceptionInUseCase } from 'src/infrastructure/utils/exception/exeption-in-use-case.exception'
import * as bcrypt from 'bcrypt'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AuthService {
  constructor(private readonly accountsRepository: AccountsTypeOrmRepository) {}

  async login(email: string, password: string) {
    const account = await this.accountsRepository.findByEmail(email)

    if (!account) {
      throw new ExceptionInUseCase('Usuário não encontrado')
    }

    if (await bcrypt.compare(password, account.password)) {
      const token = Buffer.from(
        JSON.stringify({
          id: account.id,
          name: account.name,
          email: account.email,
          exp: Date.now() + 7 * 24 * 60 * 60 * 1000,
        }),
      ).toString('base64')

      return {
        success: true,
        user: {
          id: account.id,
          name: account.name,
          email: account.email,
        },
        token,
      }
    }
    throw new ExceptionInUseCase('Senha incorreta. Por favor, tente novamente.')
  }
}
