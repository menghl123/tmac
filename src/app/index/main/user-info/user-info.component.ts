import {Component, OnInit} from '@angular/core';
import {TmacAuthorizationService} from '../../../tmacPermission/Authorization.service';
import {User} from '../../../shared/model/user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {
  isLogged: boolean = false;
  user: User;

  constructor(private authorizationService: TmacAuthorizationService) {
  }

  ngOnInit() {
    this.isLogged = this.authorizationService.isLogin();
    this.user = this.authorizationService.getCurrentUser();
    this.authorizationService.userChange.subscribe((user) => {
      this.isLogged = this.authorizationService.isLogin();
      this.user = this.authorizationService.getCurrentUser();
    });
  }

}
