import {Injectable} from '@angular/core';
import {OverlayService} from '../../components';

@Injectable()
export class LoadingService {

  constructor(private overlayService: OverlayService) {

  }

  show() {
    setTimeout(() => this.overlayService.open({
      html: `<div class="loading"></div>`
    }));
  }

  hide() {
    setTimeout(() => {
      this.overlayService.close();
    }, 100);
  }
}
