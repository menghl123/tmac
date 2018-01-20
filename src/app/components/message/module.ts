import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LteMessageContainer} from './message';

@NgModule({
  declarations: [LteMessageContainer],
  exports: [LteMessageContainer],
  imports: [CommonModule],
  entryComponents: [LteMessageContainer],
})
export class MessagesModule {
}
