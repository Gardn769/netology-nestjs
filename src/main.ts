import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { middlewares } from './middlewares';
import { swagger } from './swagger';
import { config } from './configs';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, {
    logger: config().prod
      ? ['log', 'error', 'warn']
      : ['log', 'debug', 'error', 'warn', 'verbose'],
  });

  middlewares(app);

  swagger(app);
  const Port = process.env.Port || 3000;

  await app.listen(Port, () => Logger.log(`Server started on port = ${Port}`));
}
void bootstrap();
