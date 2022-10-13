import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WsResponse,
} from '@nestjs/websockets';
import { catchError, from, Observable, throwError } from 'rxjs';
import { CommentService } from './comment.service';
import { map } from 'rxjs/operators';
import { Comment } from '../../schemas/comment.schema';
import { CreateCommentDto } from './dto/create-comment.dto';

@WebSocketGateway()
export class CommentGateway {
  constructor(private commentService: CommentService) {}

  @SubscribeMessage('getAllComments')
  getAllComments(
    @MessageBody('bookId') bookId: string,
  ): Observable<WsResponse> {
    return from(this.commentService.readAllCommentInBook(bookId)).pipe(
      map((res: Comment[] | null) => ({
        event: 'getAllComments',
        data: res,
      })),
      catchError((error) => throwError(error)),
    );
  }

  @SubscribeMessage('addComment')
  async addComment(@MessageBody() data: CreateCommentDto): Promise<WsResponse> {
    const comment = await this.commentService.create(data);
    return {
      event: 'addComment',
      data: comment,
    };
  }
}
