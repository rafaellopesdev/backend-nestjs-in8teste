import { ApiProperty } from '@nestjs/swagger'
import { Type } from 'class-transformer'
import {
  IsArray,
  IsNumber,
  IsString,
  IsNotEmpty,
  IsOptional,
  IsPositive,
} from 'class-validator'

export class CreateOrdersDTO {
  @ApiProperty({
    description: 'List of products included in the order',
    example: [
      { id: 1, quantity: 2 },
      { id: 2, quantity: 1 },
    ],
  })
  @IsArray()
  @Type(() => Object)
  @IsNotEmpty({ each: true })
  productsIds: { id: number; quantity: number }[]

  @ApiProperty({
    description: 'Customer phone number',
    example: 11987654321,
  })
  @Type(() => Number)
  @IsNumber()
  phone: number

  @ApiProperty({
    description: 'Street name of the delivery address',
    example: 'Main Street',
  })
  @IsString()
  @IsNotEmpty()
  street: string

  @ApiProperty({
    description: 'House or building number',
    example: 123,
  })
  @Type(() => Number)
  @IsNumber()
  number: number

  @ApiProperty({
    description: 'Neighborhood of the delivery address',
    example: 'Downtown',
  })
  @IsString()
  @IsNotEmpty()
  neighborhood: string

  @ApiProperty({
    description: 'ZIP code of the delivery address',
    example: '12345-678',
  })
  @IsString()
  @IsNotEmpty()
  zipCode: string

  @ApiProperty({
    description: 'City of the delivery address',
    example: 'São Paulo',
  })
  @IsString()
  @IsNotEmpty()
  city: string

  @ApiProperty({
    description: 'State code (e.g., SP, RJ)',
    example: 'SP',
  })
  @IsString()
  @IsNotEmpty()
  state: string

  @ApiProperty({
    description: 'Full name of the state',
    example: 'São Paulo',
  })
  @IsString()
  @IsNotEmpty()
  stateName: string

  @ApiProperty({
    description: 'Additional observations for the order',
    example: 'Leave at the front desk',
    required: false,
  })
  @IsOptional()
  @IsString()
  observation?: string

  @ApiProperty({
    description: 'Total amount of the order',
    example: 199.99,
  })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  total: number
}
