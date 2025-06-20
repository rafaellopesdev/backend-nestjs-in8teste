import { Injectable } from '@nestjs/common'
import { ProductsTypeOrmRepository } from 'src/infrastructure/persistence/typeorm/repositories/products/products-typeorm.repository'
import { FindAllProductsDTO } from 'src/presentation/api/products/dtos/find-all-products.dto'
import axios from 'axios'
import { ProductsEntity } from './entities/products.entity'

@Injectable()
export class ProductsService {
  constructor(private readonly productRepository: ProductsTypeOrmRepository) {}

  async findAll(options: FindAllProductsDTO) {
    let findAllProducts = await this.productRepository.findAll(options)

    const uniqueMaterials: string[] = [
      ...new Set(
        findAllProducts.products.map(product => product.details.material),
      ),
    ]
    
    if (findAllProducts.total <= 0) {
      await this.syncAlternatedProductsFromExternalAPIs()
      findAllProducts = await this.productRepository.findAll(options)
    }
    
    const totalProducts = findAllProducts.total
    const totalPages = Math.floor(totalProducts / options.limit)
    const hasNextPage = options.page < totalPages
    const hasPrevPage = options.page > 1

    return {
      products: findAllProducts.products,
      pagination: {
        currentPage: options.page,
        totalPages,
        totalProducts,
        hasNextPage,
        hasPrevPage,
        limit: options.limit,
      },
      filters: {
        materials: uniqueMaterials,
      },
    }
  }

  private async syncAlternatedProductsFromExternalAPIs(): Promise<void> {
    const [euResponse, brResponse] = await Promise.all([
      axios.get('https://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider'),
      axios.get('https://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider'),
    ])

    const euProducts = euResponse.data
    const brProducts = brResponse.data

    const maxLength = Math.max(euProducts.length, brProducts.length)

    for (let i = 0; i < maxLength; i++) {
      if (i < euProducts.length) {
        const product = euProducts[i]
        const productData: ProductsEntity = {
          name: product.name,
          description: product.description,
          price: Number(product.price),
          hasDiscount: product.hasDiscount,
          gallery: [
            'https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ',
            'https://fastly.picsum.photos/id/8/5000/3333.jpg?hmac=OeG5ufhPYQBd6Rx1TAldAuF92lhCzAhKQKttGfawWuA',
            'https://fastly.picsum.photos/id/19/2500/1667.jpg?hmac=7epGozH4QjToGaBf_xb2HbFTXoV5o8n_cYzB7I4lt6g',
            'https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY',
          ],
          discountValue: Number(product.discountValue),
          details: {
            adjective: product.details.adjective,
            material: product.details.material,
          },
        }
        await this.productRepository.create(productData)
      }

      if (i < brProducts.length) {
        const product = brProducts[i]
        const productData: ProductsEntity = {
          name: product.nome,
          description: product.descricao,
          price: Number(product.preco),
          hasDiscount: false,
          gallery: [
            'https://fastly.picsum.photos/id/19/2500/1667.jpg?hmac=7epGozH4QjToGaBf_xb2HbFTXoV5o8n_cYzB7I4lt6g',
            'https://fastly.picsum.photos/id/11/2500/1667.jpg?hmac=xxjFJtAPgshYkysU_aqx2sZir-kIOjNR9vx0te7GycQ',
            'https://fastly.picsum.photos/id/8/5000/3333.jpg?hmac=OeG5ufhPYQBd6Rx1TAldAuF92lhCzAhKQKttGfawWuA',
            'https://fastly.picsum.photos/id/17/2500/1667.jpg?hmac=HD-JrnNUZjFiP2UZQvWcKrgLoC_pc_ouUSWv8kHsJJY',
          ],
          discountValue: 0,
          details: {
            adjective: product.departamento,
            material: product.material,
          },
        }
        await this.productRepository.create(productData)
      }
    }
  }
}
