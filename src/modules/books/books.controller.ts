import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { BookModel } from '../../models/book.model';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller()
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  async create(@Body() data: CreateBookDto): Promise<BookModel> {
    return await this.booksService.create(data);
  }

  @Get(':id')
  async read(@Param('id') id: string): Promise<BookModel> {
    return await this.booksService.read(id);
  }

  @Patch()
  async update(@Body() data: UpdateBookDto): Promise<BookModel> {
    return await this.booksService.update(data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    return await this.booksService.delete(id);
  }
}
