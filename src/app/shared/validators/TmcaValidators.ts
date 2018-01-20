import {AbstractControl} from '@angular/forms';

export class TmacValidators {
  static getFormatValid(regExp: string): any {
    return (control: AbstractControl) => {
      return new RegExp(regExp).test(control.value) ? {'formatValid': true} : null;
    };
  }

  static sameValid(value?: any): any {
    return (control: AbstractControl) => {debugger
      return value !== control.value ? {'formatValid': true} : null;
    };
  }

  static numberValid(control: AbstractControl): any {
    return control.value % 1 !== 0 ? {'numberValid': true} : null;
  }
}
