import { Book } from './../../schemas/book.schema';
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
import { UpdateBookDto } from './dto/update-book.dto';

@Controller()
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  async create(@Body() data: CreateBookDto): Promise<Book | null> {
    return await this.booksService.create(data);
  }

  @Get(':id')
  async read(@Param('id') id: string): Promise<Book | null> {
    return await this.booksService.read(id);
  }

  @Patch()
  async update(
    @Param('id') id: string,
    @Body() data: UpdateBookDto,
  ): Promise<Book | null> {
    return await this.booksService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<string> {
    return await this.booksService.delete(id);
  }
}
