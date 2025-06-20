import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common'
import { SwaggerConfigModule } from './infrastructure/utils/swagger.utils'
import { ResponseInterceptor } from './infrastructure/utils/response-interceptor.util'
import { ExceptionInterceptor } from './infrastructure/utils/exception-interceptor.util'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.enableCors()

  app.useGlobalInterceptors(new ResponseInterceptor())
  app.useGlobalFilters(new ExceptionInterceptor())

  app.setGlobalPrefix('api/v1/')

  SwaggerConfigModule.configure(app)

  await app.listen(process.env.PORT ?? 3001)
}
bootstrap()
