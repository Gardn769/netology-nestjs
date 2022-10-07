import { Book, BookSchema } from './../../schemas/book.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { BooksService } from './books.service';
import { BooksController } from './books.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema }]),
  ],
  providers: [BooksService],
  controllers: [BooksController],
})
export class BooksModule {}
