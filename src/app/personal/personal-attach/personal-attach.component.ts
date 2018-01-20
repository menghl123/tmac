import {Component, ComponentFactoryResolver, OnInit} from '@angular/core';
import {User} from '../../shared/model/user.model';
import {TmacAuthorizationService} from '../../tmacPermission/Authorization.service';
import {ModalService} from '../../components/modal/modal.service';
import {PersonalAvatarComponent} from '../personal-avatar/personal-avatar.component';
import {PersonalService} from '../service/personal.service';
import {LteMessageService} from '../../components/message/message.service';
import {PersonalModifyComponent} from '../personal-modify/personal-modify.component';

@Component({
  selector: 'app-personal-attach',
  templateUrl: './personal-attach.component.html',
  styleUrls: ['./personal-attach.component.scss']
})
export class PersonalAttachComponent implements OnInit {
  user: User;

  constructor(private authorizationService: TmacAuthorizationService,
              private componentFactoryResolver: ComponentFactoryResolver,
              private lteMessageService: LteMessageService,
              private personalService: PersonalService,
              private modalService: ModalService) {
  }

  ngOnInit() {
    this.user = this.authorizationService.getCurrentUser();
  }

  goToChangeAvatar() {
    this.modalService.open<string>({
      component: PersonalAvatarComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        selectUrl: this.user.img
      },
      size: 'lg'
    })
      .subscribe(selectUrl => {
        this.personalService.changeImg(selectUrl, this.user.id).subscribe(res => {
          this.lteMessageService.success('修改成功');
          this.user = res;
          this.authorizationService.setCurrentUser(this.user);
          this.authorizationService.userChange.emit(res);
        }, error => {
          this.lteMessageService.error('修改头像失败');
        });
      }, error => {
        console.error('no change img', error);
      });
  }

  goToModify(user) {
    this.modalService.open<any>({
      component: PersonalModifyComponent,
      componentFactoryResolver: this.componentFactoryResolver,
      resolve: {
        user: user
      },
      size: 'lg'
    })
      .subscribe($user => {
        this.user = $user;
      }, error => {
        console.error('no change img', error);
      });
  }

}
