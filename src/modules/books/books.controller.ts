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
  create(@Body() data: CreateBookDto): BookModel {
    return this.booksService.create(data);
  }

  @Get(':id')
  read(@Param('id') id: string): BookModel {
    return this.booksService.read(id);
  }

  @Patch()
  update(@Body() data: UpdateBookDto): BookModel {
    return this.booksService.update(data);
  }

  @Delete(':id')
  delete(@Param('id') id: string): void {
    this.booksService.delete(id);
  }
}
