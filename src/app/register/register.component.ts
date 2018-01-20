import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TmacValidators} from '../shared/validators/TmcaValidators';
import {UserValidator} from './service/user.validator';
import {RegisterService} from './service/register.service';
import {LteMessageService} from '../components/message/message.service';
import {LoginService} from '../core/login/login.service';
import {Router} from '@angular/router';
import {TmacAuthorizationService} from '../tmacPermission/Authorization.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private lteMessageService: LteMessageService,
              private loginService: LoginService,
              private registerService: RegisterService,
              private authorizationService: TmacAuthorizationService,
              private router: Router,
              private userValidator: UserValidator) {
    this.form = this.fb.group({
      account: ['', [Validators.required, TmacValidators.getFormatValid('[^-a-zA-Z0-9]')],
        this.userValidator.accountUnique()],
      username: ['', [Validators.required, TmacValidators.getFormatValid('[^-a-zA-Z0-9_\u4e00-\u9fa5]')]
      ],
      password: ['', [Validators.required, TmacValidators.getFormatValid('[^-a-zA-Z0-9]')]],
      repassword: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      img: ['/assets/images/headImg/1.jpg']
    });
  }

  ngOnInit() {
  }

  repasswordValid() {
    return this.form.value.password === this.form.value.repassword;
  }

  register($event) {
    this.form.patchValue({department: '人力资源'});
    this.registerService.register(this.form.value).subscribe((user) => {
      this.loginService.login({
        account: user.account,
        password: user.password
      }).subscribe(res => {
        this.lteMessageService.success('注册成功，跳转到主页！');
        this.authorizationService.setCurrentUser(res);
        this.router.navigate(['/']);
      }, res => this.lteMessageService.warning('登录失败'));
    }, (res) => this.lteMessageService.warning('注册失败'));
  }

}
