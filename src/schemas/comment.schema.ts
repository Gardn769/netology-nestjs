import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Book } from './book.schema';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({
    type: Types.ObjectId,
    ref: 'Book',
  })
  book!: Book;

  @Prop()
  comment!: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
