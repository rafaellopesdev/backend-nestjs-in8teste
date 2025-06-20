import { Injectable } from '@nestjs/common'
import { AccountsTypeOrmRepository } from 'src/infrastructure/persistence/typeorm/repositories/accounts/accounts-typeorm.repository'
import * as bcrypt from 'bcrypt'
import { ExceptionInUseCase } from 'src/infrastructure/utils/exception/exeption-in-use-case.exception'
import { CreateAccountDTO } from 'src/presentation/api/accounts/dtos/create-account.dto'

@Injectable()
export class AccountsService {
  constructor(private readonly accountsRepository: AccountsTypeOrmRepository) {}

  async create(payload: CreateAccountDTO) {
    const emailUnique = await this.isEmailUnique(payload.email)
    if (!emailUnique) {
      throw new ExceptionInUseCase(
        'E-mail já cadastrado. Por favor, utilize outro e-mail.',
      )
    }

    if (payload.password.length < 6) {
      throw new ExceptionInUseCase('A senha deve ter pelo menos 6 caracteres.')
    }

    const hashedPassword = await bcrypt.hash(payload.password, 10)
    payload.password = hashedPassword

    return await this.accountsRepository.create(payload)
  }

  private async isEmailUnique(email: string): Promise<boolean> {
    const emailExists = await this.accountsRepository.findByEmail(email)
    return !emailExists
  }
}
