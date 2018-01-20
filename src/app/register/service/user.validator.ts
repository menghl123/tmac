import {Injectable} from '@angular/core';
import {RegisterService} from './register.service';
import {AbstractControl} from '@angular/forms';

@Injectable()
export class UserValidator {

  constructor(private userService: RegisterService) {
  }

  accountUnique(account?: string) {
    return (control: AbstractControl) => {
      return this.userService.userAccountUnique(control.value)
        .map(res => {
            return res.valid || account === control.value ? null : {'accountUnique': true};
          }
        );
    };
  }

}
