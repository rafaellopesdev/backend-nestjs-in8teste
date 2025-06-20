export class OrdersEntity {
  accountId: number
  productsIds: { id: number; quantity: number }[]
  phone: number
  street: string
  number: number
  neighborhood: string
  zipCode: string
  city: string
  state: string
  stateName: string
  observation?: string
  total: number
  status: string
}
