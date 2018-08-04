import {Injectable} from '@angular/core';
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

  public wordPreviewHtml(formData: FormData): Observable<any> {
    return this.tmacHttpClient
      .post('wordPreviewHtml', formData);
  }

  public excelPreviewHtml(formData: FormData): Observable<{ [key: string]: string }> {
    return this.tmacHttpClient
      .post('excelPreviewHtml', formData);
  }

}
