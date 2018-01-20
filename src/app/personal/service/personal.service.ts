import {Injectable} from '@angular/core';
import {TmacHttpClient} from '../../tmacHttp/tmac-http-client';
import {User} from '../../shared/model/user.model';

@Injectable()
export class PersonalService {

  constructor(private tmacHttpClient: TmacHttpClient) {
  }

  public changeImg(img: string, userId: string) {
    return this.tmacHttpClient.get('personal/changeImg', {
      params: {img: img, userId: userId},
    });
  }


  public supplyUserInfo(user: User) {
    return this.tmacHttpClient.post('personal/supplyUserInfo', user);
  }

  public dashboard(userId: string) {
    return this.tmacHttpClient.get('personal/dashboard', {
      params: {userId: userId},
    });
  }

}
