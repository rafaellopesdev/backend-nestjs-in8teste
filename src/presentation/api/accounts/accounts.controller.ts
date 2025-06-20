import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AccountsService } from 'src/domain/accounts/accounts.services'
import { CreateAccountDTO } from './dtos/create-account.dto'

@ApiTags('Accounts')
@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('/create')
  async create(@Body() payload: CreateAccountDTO) {
    await this.accountsService.create(payload)
    return { content: { message: 'Conta criada com sucesso.' } }
  }
}
