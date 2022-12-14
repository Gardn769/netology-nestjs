import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { LoggerContextMiddleware } from './middlewares/logger-context.middleware';

@Global()
@Module({
  imports: [],
  providers: [],
  exports: [],
})
export class CommonModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerContextMiddleware).forRoutes('*');
  }
}
