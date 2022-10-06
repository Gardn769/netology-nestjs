import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { config } from './configs';
import { BooksModule } from './modules/books/books.module';

@Module({
  imports: [
    ConfigModule.forRoot({ load: [config], isGlobal: true }),
    BooksModule,
  ],
})
export class AppModule {}
