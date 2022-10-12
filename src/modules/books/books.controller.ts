import { JwtAuthGuard } from './../../auth/guards/jwtAuth.guard';
import { Book } from './../../schemas/book.schema';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('books')
@Controller('books')
@UseGuards(JwtAuthGuard)
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Post()
  async create(@Body() data: CreateBookDto): Promise<Book> {
    return await this.booksService.create(data);
  }

  @Get(':id')
  async read(@Param('id') id: string): Promise<Book | null> {
    return await this.booksService.read(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() data: UpdateBookDto,
  ): Promise<Book | null> {
    return await this.booksService.update(id, data);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<Book | null> {
    return await this.booksService.delete(id);
  }
}
