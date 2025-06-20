import { AccountsEntity } from 'src/domain/accounts/entities/accounts.entity'
import { CreateAccountDTO } from 'src/presentation/api/accounts/dtos/create-account.dto'

export interface AccountsTypeOrmInterface {
  create(account: CreateAccountDTO): Promise<AccountsEntity>
  findById(id: number)
  findByEmail(email: string)
}
