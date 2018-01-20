import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class BreadcrumbService {
  public breadcrumbsEmitter: EventEmitter<any> = new EventEmitter<any>();

}
