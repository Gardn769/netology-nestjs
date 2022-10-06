import { Injectable } from '@nestjs/common';
import { BookModel } from '../../models/book.model';
import { CreateBookDto } from './dto/create-book.dto';
import { randomUUID } from 'crypto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private readonly books: BookModel[] = [];

  create(data: CreateBookDto): BookModel {
    const book: BookModel = {
      id: randomUUID(),
      ...data,
    };
    this.books.push(book);
    return book;
  }

  read(id: string): BookModel {
    const idx: number = this.books.findIndex(
      (book: BookModel) => book.id === id,
    );
    return this.books[idx];
  }

  update(data: UpdateBookDto): BookModel {
    const idx: number = this.books.findIndex(
      (book: BookModel) => book.id === data.id,
    );
    this.books[idx] = {
      ...data,
      ...this.books[idx],
    };
    return this.books[idx];
  }

  delete(id: string): void {
    const idx: number = this.books.findIndex(
      (book: BookModel) => book.id === id,
    );
    this.books.splice(idx, 1);
  }
}
