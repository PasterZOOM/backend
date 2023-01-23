import { NestFactory } from '@nestjs/core'

import { AppModule } from './app.module'

const port = 8001

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule)

  await app.listen(port)
}
bootstrap().then()
