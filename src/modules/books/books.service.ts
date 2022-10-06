import { Injectable } from '@nestjs/common';
import { BookModel } from '../../models/book.model';
import { CreateBookDto } from './dto/create-book.dto';
import { randomUUID } from 'crypto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private readonly books: BookModel[] = [];

  async create(data: CreateBookDto): Promise<BookModel> {
    const book: BookModel = {
      id: randomUUID(),
      ...data,
    };
    this.books.push(book);
    return await book;
  }

  async read(id: string): Promise<BookModel> {
    const idx: number = this.books.findIndex(
      (book: BookModel) => book.id === id,
    );
    return await this.books[idx];
  }

  async update(data: UpdateBookDto): Promise<BookModel> {
    const idx: number = this.books.findIndex(
      (book: BookModel) => book.id === data.id,
    );
    this.books[idx] = {
      ...data,
      ...this.books[idx],
    };
    return await this.books[idx];
  }

  delete(id: string): string {
    const idx: number = this.books.findIndex(
      (book: BookModel) => book.id === id,
    );
    this.books.splice(idx, 1);
    return 'true';
  }
}
