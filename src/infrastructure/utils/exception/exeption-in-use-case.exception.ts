export class ExceptionInUseCase extends Error {
  statusCode: number

  constructor(message: string, statusCode: number = 400) {
    super(message)
    this.name = 'ExceptionInUseCase'
    this.statusCode = statusCode
  }
}
