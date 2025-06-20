import { Body, Controller, Post } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { AuthService } from 'src/domain/auth/auth.service'
import { LoginAuthDTO } from './dtos/login-auth.dto'

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginAuthDTO: LoginAuthDTO) {
    return {
      content: await this.authService.login(
        loginAuthDTO.email,
        loginAuthDTO.password,
      ),
    }
  }
}
