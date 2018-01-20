import {Component, forwardRef, Input, NgModule, OnInit} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {ControlValueAccessor, FormsModule, NG_VALUE_ACCESSOR} from '@angular/forms';
import {CommonModule} from '@angular/common';

@Component({
  selector: 'lte-switch',
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => EtSwitch),
    multi: true
  }],
  template: `
    <label class="lte-switch"
           (click)="changeHandle($event)"
           [class.is-disabled]="disabled"
           [class.lte-switch--wide]="hasText"
           [class.is-checked]="checked">
      <div class="lte-switch__mask" *ngIf="disabled"></div>
      <div class="lte-switch__label lte-switch__lablte--left" [class.is-active]="!checked"
           *ngIf="inactiveText || inactiveIconClass">
        <i [class]="inactiveIconClass" *ngIf="inactiveIconClass"></i>
        <span *ngIf="!inactiveIconClass">{{ inactiveText }}</span>
      </div>

      <span class="lte-switch__core" [style]="coreStyles">
        <span class="lte-switch__button" [style]="iconTransform"></span>
      </span>

      <div class="lte-switch__label lte-switch__lablte--right" [class.is-active]="checked"
           *ngIf="activeText || activeIconClass">
        <i [class]="activeIconClass" *ngIf="activeIconClass"></i>
        <span *ngIf="!activeIconClass">{{ activeText }}</span>
      </div>
    </label>
  `,
})
export class EtSwitch implements OnInit, ControlValueAccessor {
  @Input()
  activeValue: any;
  @Input()
  inactiveValue: any;
  @Input() name: string;
  @Input() disabled = false;
  @Input() width: number;
  @Input() activeIconClass: string;
  @Input() inactiveIconClass: string;
  @Input() activeText: string;
  @Input() inactiveText: string;
  @Input() activeColor = '#409EFF';
  @Input() inactiveColor = '#C0CCDA';
  private model: any = false;
   checked: boolean = false;

  hasText = false;
  realWidth: number;
  coreStyles: SafeStyle;
  iconTransform: SafeStyle;

  constructor(private sanitizer: DomSanitizer) {
  }

  changeHandle($event): void {
    this.checked = !this.checked;
    if (this.checked) {
      this.model = this.activeValue || true;
      this.controlChange(this.model);
    } else {
      this.model = this.inactiveValue || false;
      this.controlChange(this.model);
    }
    this.updateStyles();
  }

  updateStyles(): void {
    let baseStyle = `width: ${this.realWidth}px;`;
    const translate = this.checked ? `translate3d(${this.realWidth - 20}px, 0, 0)` : '';
    const color = this.checked ? this.activeColor : this.inactiveColor;
    const colorStyles = `border-color: ${color}; background-color: ${color};`;

    this.iconTransform = this.sanitizer.bypassSecurityTrustStyle(`transform: ${translate}`);
    if (this.activeColor && this.inactiveColor) {
      baseStyle += colorStyles;
    }
    this.coreStyles = this.sanitizer.bypassSecurityTrustStyle(baseStyle);
  }

  ngOnInit(): void {
    this.realWidth = this.width ? this.width : 40;
    this.updateStyles();
  }

  writeValue(value: any): void {
    this.model = value;
    this.checked = value === true || `${value}` === `${this.activeValue}`;
    this.updateStyles();
  }

  registerOnChange(fn: Function): void {
    this.controlChange = fn;
  }

  registerOnTouched(fn: Function): void {
    this.controlTouch = fn;
  }

  private controlChange: Function = () => {
  }
  private controlTouch: Function = () => {
  }

}

@NgModule({
  declarations: [EtSwitch],
  exports: [EtSwitch],
  imports: [CommonModule, FormsModule],
  entryComponents: [EtSwitch],
})
export class EtSwitchModule {
}
