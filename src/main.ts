import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { SwaggerTheme } from 'swagger-themes'

import { AppModule } from './app.module'

const port = 8001

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  app.enableCors({
    origin: ['https://frontend-kappa-umber.vercel.app/'],
  })
  const config = new DocumentBuilder()
    .setTitle('Pi Straps')
    .setDescription('Pi Straps API description')
    .setVersion('1.0')
    .addTag('Pi Straps')
    .build()

  const document = SwaggerModule.createDocument(app, config)
  const theme = new SwaggerTheme('v3')
  const options = {
    explorer: true,
    customCss: theme.getBuffer('dark'),
  }

  SwaggerModule.setup('api', app, document, options)
  app.enableCors()
  await app.listen(port)
}

bootstrap().then()
