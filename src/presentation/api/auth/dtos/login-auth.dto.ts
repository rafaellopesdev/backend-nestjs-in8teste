import { ApiProperty } from '@nestjs/swagger'
import { IsEmail, IsNotEmpty } from 'class-validator'

export class LoginAuthDTO {
  @ApiProperty({
    description: 'Email of the user',
    example: 'joao.silva@email.com',
  })
  @IsEmail({}, { message: 'Invalid email' })
  email: string

  @ApiProperty({
    description: 'Password of the user',
    example: 'securePassword123',
  })
  @IsNotEmpty({ message: 'Password is required' })
  password: string
}
