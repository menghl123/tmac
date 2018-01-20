import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {LoginRequest} from '../../login/login.model';
import {TmacHttpClient} from '../../tmacHttp/tmac-http-client';

@Injectable()
export class LoginService {

  constructor(private tmacHttpClient: TmacHttpClient) {
  }

  public login(loginRequest: LoginRequest): Observable<any> {
    return this.tmacHttpClient
      .post('login', loginRequest);
  }

}
