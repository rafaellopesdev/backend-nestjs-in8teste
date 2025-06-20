import { ApiProperty } from '@nestjs/swagger'
import { IsNumber } from 'class-validator'
import { Type } from 'class-transformer'

export class AddToCartDTO {
  @ApiProperty({
    example: 1,
    description: 'Id of the product',
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  productId: number
}
