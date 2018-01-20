import {Component} from '@angular/core';
import {DomSanitizer, SafeUrl} from '@angular/platform-browser';
import * as Icons from './images';
import {slideAnimation} from '../shared/animation';

@Component({
  selector: 'lte-message-container',
  template: `
    <div [class]="'lte-message ' + customClass + (type && !iconClass ? ' lte-message--' + type : '')"
         [class.is-center]="center"
         style="visibility: hidden;" role="alertdialog"
         [ngStyle]="{ 'z-index': zIndex }"
         (mouseenter)="clearTimer()" (mouseleave)="startTimer()"
         [@slideAnimation]="showBox">
      <i [class]="iconClass" *ngIf="iconClass"></i>
      <i class="fa fa-{{getIcon()}}" *ngIf="!iconClass"></i>

      <p class="lte-message__content" tabindex="0">{{ message }}</p>
      <div *ngIf="showClose" class="lte-message__closeBtn lte-icon-close" (click)="close()" role="button"></div>
    </div>
  `,
  animations: [slideAnimation]
})
export class LteMessageContainer {

  // element id, for destroy com
  id: string;
  iconMap = {
    success: 'check',
    warning: 'warning',
    info: 'info',
    error: 'error'
  }

  showClose = false;
  type = 'info';
  center = false;
  duration = 3000;
  // user setting
  iconClass = '';
  customClass = '';
  zIndex = 1000;

  message = '';
  showBox = false;
  timer: any;

  onClose: Function = () => {
  };
  onDestroy: Function = () => {
  };

  constructor(private sanitizer: DomSanitizer,) {
  }


  getIcon(): string {
    return this.iconMap[this.type];
  }

  makeLink(): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(Icons[this.type]);
  }

  show(message: string): void {
    this.message = message;
    this.showBox = true;
    this.timer = setTimeout(() => {
      this.close();
    }, this.duration);
  }

  close(): void {
    this.timer && clearTimeout(this.timer);
    this.showBox = false;
    this.onClose();
    this.onDestroy();
  }

  startTimer(): void {
    if (!this.showBox) return;
    this.timer = setTimeout(() => {
      this.close();
    }, this.duration);
  }

  clearTimer(): void {
    this.timer && clearTimeout(this.timer);
  }

}
