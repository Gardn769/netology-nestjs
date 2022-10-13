import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Comment, CommentDocument } from '../../schemas/comment.schema';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(data: CreateCommentDto): Promise<Comment> {
    return await this.commentModel.create(data);
  }

  read(id: string): Promise<Comment | null> {
    return this.commentModel.findById(id).exec();
  }

  async update(id: string, data: UpdateCommentDto): Promise<void> {
    await this.commentModel.findByIdAndUpdate(id, data);
  }

  async remove(id: string): Promise<void> {
    await this.commentModel.findByIdAndDelete(id);
  }

  async readAllCommentInBook(bookId: string): Promise<Comment[] | null> {
    return this.commentModel.find({ book: bookId }).exec();
  }
}
