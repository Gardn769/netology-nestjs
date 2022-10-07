import { Book, BookDocument } from './../../schemas/book.schema';
import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async create(data: CreateBookDto): Promise<Book> {
    const book: BookDocument = new this.bookModel(data);
    return book.save();
  }

  async read(id: string): Promise<Book | null> {
    return await this.bookModel.findById(id).exec();
  }

  async update(id: string, data: UpdateBookDto): Promise<Book | null> {
    return await this.bookModel.findByIdAndUpdate(id, data);
  }

  async delete(id: string): Promise<Book | null> {
    return await this.bookModel.findByIdAndDelete(id);
  }
}
