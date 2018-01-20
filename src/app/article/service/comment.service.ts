import {Injectable} from '@angular/core';
import {TmacHttpClient} from '../../tmacHttp/tmac-http-client';
import {Observable} from 'rxjs/Observable';
import {Article, Comment} from '../article.model';

@Injectable()
export class CommentService {

  constructor(private tmacHttpClient: TmacHttpClient) {
  }

  public save(comment: Comment): Observable<any> {
    return this.tmacHttpClient
      .post('comments', comment);
  }

  public findAll(destId: string, index: number, size: number): Observable<any> {
    return this.tmacHttpClient
      .get('comments',
        {
          params:
            {page: index, size: size, destId: destId}
        });
  }

  public find(id: string): Observable<Article> {
    return this.tmacHttpClient
      .get(`articles/${id}`);
  }

  public increaseViewCount(id: string) {
    this.tmacHttpClient
      .get(
        'articles/increaseViewCount',
        {
          params: {id: id, ignoreLoading: true},
        }
      ).subscribe(() => {
    });
  }

  changeCanComment(id: any): Observable<Article> {
    return this.tmacHttpClient
      .get(
        'articles/changeCanComment',
        {
          params: {id: id},
        }
      );
  }

  topArticle(id: string): Observable<any> {
    return this.tmacHttpClient
      .get(
        'articles/topArticle',
        {
          params: {id: id},
        }
      );
  }

  delete(ids: string[]): Observable<any> {
    return this.tmacHttpClient
      .delete('articles', {
        params: {ids: ids},
      });
  }

  public modify(article: Article): Observable<Article> {
    return this.tmacHttpClient
      .put('articles', article);
  }
}
