import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import { IsNumber } from 'class-validator'

export class UpdateQuantityCartDTO {
  @ApiProperty({
    example: 1,
    description: 'id of the product',
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  productId: number

  @ApiProperty({
    example: 2,
    description: 'Quantity of the product',
    type: Number,
  })
  @Type(() => Number)
  @IsNumber()
  quantity: number
}
