import { Repository } from 'typeorm'
import { AccountsTypeOrmInterface } from '../../interfaces/accounts/accounts-typeorm.interface'
import { AccountsTypeormEntity } from '../../entities/accounts/accounts-typeorm.entity'
import { InjectRepository } from '@nestjs/typeorm'
import { Injectable } from '@nestjs/common'
import { AccountsEntity } from 'src/domain/accounts/entities/accounts.entity'

@Injectable()
export class AccountsTypeOrmRepository implements AccountsTypeOrmInterface {
  constructor(
    @InjectRepository(AccountsTypeormEntity)
    private readonly accountsRepository: Repository<AccountsTypeormEntity>,
  ) {}

  async create(account: AccountsEntity): Promise<AccountsEntity> {
    const newAccount = this.accountsRepository.create(account)
    return await this.accountsRepository.save(newAccount)
  }

  async findById(id: number) {
    return await this.accountsRepository.findOne({ where: { id } })
  }

  async findByEmail(email: string) {
    return await this.accountsRepository.findOne({ where: { email } })
  }
}
