import { BooksService } from './books.service';
import { Model } from 'mongoose';
import { Book, BookDocument } from '../../schemas/book.schema';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

describe('books service', () => {
  let service: BooksService;
  let bookModel: Model<BookDocument>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getModelToken(Book.name),
          useValue: {
            create: jest.fn(),
            findById: jest.fn(),
            findByIdAndUpdate: jest.fn(),
            findOneAndDelete: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
    bookModel = module.get<Model<BookDocument>>(getModelToken(Book.name));
  });

  const mockBook: Book = {
    title: 'title',
    description: 'description',
    authors: 'authors',
    favorite: 'favorite',
    fileCover: 'fileCover',
    fileBook: 'fileBook',
  };

  describe('create', () => {
    const mockData: CreateBookDto = {
      title: 'title',
      description: 'description',
      authors: 'authors',
      favorite: 'favorite',
      fileCover: 'fileCover',
      fileBook: 'fileBook',
    };

    it('create book', async () => {
      const spyCreate = jest.spyOn(bookModel, 'create');
      await service.create(mockData);
      expect(spyCreate).toBeCalled();
    });
  });

  describe('read', () => {
    it('read book', async () => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      jest.spyOn(bookModel, 'findById').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(mockBook),
      });
      const result = await service.read('42');
      expect(result).toEqual(mockBook);
    });
  });

  describe('update', () => {
    const mockData: UpdateBookDto = {
      authors: '',
      title: '',
    };

    it('update book', async () => {
      const spyUpdate = jest.spyOn(bookModel, 'findByIdAndUpdate');
      await service.update('42', mockData);
      expect(spyUpdate).toBeCalled();
    });
  });

  describe('delete', () => {
    it('delete book', async () => {
      const spyRemove = jest.spyOn(bookModel, 'findByIdAndDelete');
      await service.delete('42');
      expect(spyRemove).toBeCalled();
    });
  });
});
