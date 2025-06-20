import { ProductsEntity } from 'src/domain/products/entities/products.entity'
import { FindAllProductsDTO } from 'src/presentation/api/products/dtos/find-all-products.dto'

export interface ProductsTypeOrmInterface {
  findAll(
    options: FindAllProductsDTO,
  ): Promise<{ products: Record<string, any>[]; total: number }>
  create(product: ProductsEntity)
  findByIds(ids: number[]): Promise<ProductsEntity[]>
}
