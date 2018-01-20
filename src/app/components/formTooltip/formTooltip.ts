import {Component, NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'lte-form-tooltip',
  template: `
    <div class="form-tooltip-arrow"></div>
    <div class="form-tooltip">
      <ng-content></ng-content>
    </div>
  `
})
export class FormTooltip {

}

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [FormTooltip],
  exports: [FormTooltip]
})
export class FormTooltipModule {

}
