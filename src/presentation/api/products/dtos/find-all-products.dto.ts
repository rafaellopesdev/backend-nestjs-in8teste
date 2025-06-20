import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'
import { Transform } from 'class-transformer'
import {
  IsBoolean,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Min,
} from 'class-validator'

export class FindAllProductsDTO {
  @ApiProperty({
    description: 'Page number for pagination',
    example: 1,
  })
  @IsNumber()
  @IsPositive()
  @Transform(value => parseInt(value.value))
  page: number

  @ApiProperty({
    description: 'Number of items per page',
    example: 10,
  })
  @IsNumber()
  @IsPositive()
  @Transform(value => parseInt(value.value))
  limit: number

  @ApiPropertyOptional({
    description: 'Search term to filter products by name or description',
    example: 'sofa',
  })
  @IsOptional()
  @IsString()
  search?: string

  @ApiPropertyOptional({
    description: 'Minimum price filter',
    example: 100.0,
  })
  @IsOptional()
  @Transform(value => parseInt(value.value))
  @IsNumber()
  @Min(0)
  minPrice?: number

  @ApiPropertyOptional({
    description: 'Maximum price filter',
    example: 500.0,
  })
  @IsOptional()
  @Transform(value => parseInt(value.value))
  @IsNumber()
  @Min(0)
  maxPrice?: number

  @ApiPropertyOptional({
    description: 'Whether to filter products that have discounts',
    example: true,
  })
  @IsOptional()
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  hasDiscount?: boolean

  @ApiPropertyOptional({
    description: 'Material filter (e.g., wood, metal)',
    example: 'wood',
  })
  @IsOptional()
  @IsString()
  material?: string
}
