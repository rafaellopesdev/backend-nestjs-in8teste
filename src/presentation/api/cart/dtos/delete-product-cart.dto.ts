import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber } from 'class-validator'

export class DeleteProductCartDTO {
  @ApiProperty({
    example: 1,
    description: 'Id of the product',
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  productId: number
}
