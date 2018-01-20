import {Injectable} from '@angular/core';
import {TmacHttpClient} from '../../tmacHttp/tmac-http-client';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class IndexService {

  constructor(private tmacHttpClient: TmacHttpClient) {
  }

  public findAllArticle(index: number, size: number): Observable<any> {
    return this.tmacHttpClient
      .get('index/articles',
        {
          params:
            {page: index, size: size}
        });
  }

}
