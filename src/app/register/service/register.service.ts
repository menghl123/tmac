import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {TmacHttpClient} from '../../tmacHttp/tmac-http-client';
import {User} from '../../shared/model/user.model';

@Injectable()
export class RegisterService {

  constructor(private tmacHttpClient: TmacHttpClient) {
  }

  public register(user: User): Observable<any> {
    return this.tmacHttpClient
      .post('index/register', user);
  }

  public userAccountUnique(account: string): Observable<any> {
    return this.tmacHttpClient
      .get(
        'index/users/accountUnique',
        {
          params: {account: account, ignoreLoading: true},
        }
      );
  }
}
