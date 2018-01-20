import {Component, EventEmitter, OnInit} from '@angular/core';
import {User, UserSex} from '../../shared/model/user.model';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TmacValidators} from '../../shared/validators/TmcaValidators';
import {PersonalService} from '../service/personal.service';
import {TmacAuthorizationService} from '../../tmacPermission/Authorization.service';
import {LteMessageService} from '../../components/message/message.service';

@Component({
  selector: 'app-personal-modify',
  templateUrl: './personal-modify.component.html',
  styleUrls: ['./personal-modify.component.scss']
})
export class PersonalModifyComponent implements OnInit {
  context: { user: User };
  dismiss: EventEmitter<any>;
  form: FormGroup;

  constructor(private fb: FormBuilder,
              private authorizationService: TmacAuthorizationService,
              private lteMessageService: LteMessageService,
              private personalService: PersonalService) {
  }

  ngOnInit() {
    this.form = this.fb.group({
      id: this.context.user.id,
      username: [this.context.user.username, [Validators.required, TmacValidators.getFormatValid('[^-a-zA-Z0-9_\u4e00-\u9fa5]')]
      ],
      phone: [this.context.user.phone],
      sex: [this.context.user.sex || UserSex.MAN],
      department: [this.context.user.department]
    });
  }

  ok() {
    this.personalService.supplyUserInfo(this.form.value).subscribe((res) => {
      this.lteMessageService.success('修改成功');
      this.authorizationService.setCurrentUser(res);
      this.authorizationService.userChange.emit(res);
      this.dismiss.emit(res);
    }, error => {
      this.lteMessageService.error('修改失败');
    });

  }

  cancel() {
    this.dismiss.error(false);
  }


}
