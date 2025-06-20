export class ProductsEntity {
  id?: number
  name: string
  description: string
  price: number
  hasDiscount: boolean
  gallery: string[]
  discountValue: number
  details: {
    adjective: string
    material: string
  }
}
