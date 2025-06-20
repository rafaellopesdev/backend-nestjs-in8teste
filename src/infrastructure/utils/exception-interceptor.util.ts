import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
} from '@nestjs/common'
import { ExceptionInUseCase } from './exception/exeption-in-use-case.exception'

@Catch(ExceptionInUseCase)
export class ExceptionInterceptor implements ExceptionFilter {
  catch(exception: ExceptionInUseCase, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const response = ctx.getResponse()

    const statusCode = exception?.statusCode || HttpStatus.BAD_REQUEST

    response.status(statusCode).json({
      message: exception.message,
    })
  }
}
