import { INestApplication, Module } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'

@Module({})
export class SwaggerConfigModule {
  static configure(app: INestApplication) {
    const configService = app.get<ConfigService>(ConfigService)

    const apiTitle = configService.get<string>('API_TITLE')
    const apiVersion = configService.get<string>('API_VERSION')
    const apiServer = configService.get<string>('API_SERVER')

    const config = new DocumentBuilder()
      .setTitle(apiTitle || 'API Documentation')
      .setVersion(apiVersion || '1.0')
      .addBearerAuth({
        name: 'Authorization',
        description: 'Header de autorização JWT fornecido pelo endpoint',
        in: 'header',
        scheme: 'bearer',
        type: 'http',
        bearerFormat: 'jwt',
      })
      .build()

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup(apiServer || 'api/v1/documentation', app, document)
  }
}
