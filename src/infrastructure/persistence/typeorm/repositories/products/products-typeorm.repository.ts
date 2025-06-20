import { InjectRepository } from '@nestjs/typeorm'
import { ProductsTypeOrmInterface } from '../../interfaces/products/products-typeorm.interface'
import { ProductsTypeOrmEntity } from '../../entities/products/products-typeorm.entity'
import { In, Repository } from 'typeorm'
import { FindAllProductsDTO } from 'src/presentation/api/products/dtos/find-all-products.dto'
import { Injectable } from '@nestjs/common'
import { ProductsEntity } from 'src/domain/products/entities/products.entity'

@Injectable()
export class ProductsTypeOrmRepository implements ProductsTypeOrmInterface {
  constructor(
    @InjectRepository(ProductsTypeOrmEntity)
    private readonly productsRepository: Repository<ProductsTypeOrmEntity>,
  ) {}

  async findByIds(ids: number[]): Promise<ProductsEntity[]> {
    const products = await this.productsRepository.findBy({
      id: In(ids),
    })
    return products
  }

  async create(product: ProductsEntity) {
    const newProduct = this.productsRepository.create(product)
    await this.productsRepository.save(newProduct)
  }

  async findAll(
    options: FindAllProductsDTO,
  ): Promise<{ products: Record<string, any>[]; total: number }> {
    const { page, limit, search, minPrice, maxPrice, hasDiscount, material } =
      options

    const skip = (page - 1) * limit

    const query = this.productsRepository
      .createQueryBuilder('product')
      .orderBy('product.id', 'ASC')
      .skip(skip)
      .take(limit)

    if (search) {
      console.log('Search term:', search)
      query.andWhere('product.name LIKE :search', { search: `%${search}%` })
    }

    if (minPrice !== undefined) {
      query.andWhere('product.price >= :minPrice', { minPrice })
    }

    if (maxPrice !== undefined) {
      query.andWhere('product.price <= :maxPrice', { maxPrice })
    }

    if (hasDiscount !== undefined) {
      query.andWhere('product.hasDiscount = :hasDiscount', { hasDiscount })
    }

    if (material) {
      query.andWhere(`product.details ->> 'material' = :material`, {
        material,
      })
    }

    const [products, total] = await query.getManyAndCount()

    return {
      products,
      total,
    }
  }
}
