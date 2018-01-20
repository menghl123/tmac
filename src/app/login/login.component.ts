import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {FormBuilder, FormGroup} from '@angular/forms';
import {LoginService} from '../core/login/login.service';
import {TmacAuthorizationService} from '../tmacPermission/Authorization.service';
import {LteMessageService} from '../components/message/message.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form: FormGroup;

  constructor(private messageService: LteMessageService,
              private fb: FormBuilder,
              private loginService: LoginService,
              private authorizationService: TmacAuthorizationService,
              private router: Router) {
    this.form = this.fb.group({
      account: [''],
      password: ['']
    });
  }

  login() {
    this.loginService.login(this.form.value)
      .subscribe((user) => {
        this.authorizationService.setCurrentUser(user);
        // this.router.navigate(['index/main']);
        this.router.navigate(['/']);
        this.messageService.success('登录成功!');
      }, error => {
        this.form.controls.password.setErrors({'loginFaile':true});
      });
  }
}
