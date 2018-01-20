import { Injectable } from '@angular/core';
import {TmacHttpClient} from '../../tmacHttp/tmac-http-client';
import {Observable} from 'rxjs/Observable';

@Injectable()
export class FileUploadService {


  constructor(private tmacHttpClient: TmacHttpClient) {
  }

  public upload(formData: FormData): Observable<any> {
    return this.tmacHttpClient
      .post('fileUpload', formData);
  }

}
