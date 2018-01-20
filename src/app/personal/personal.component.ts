import {Component, OnInit} from '@angular/core';
import {User} from '../shared/model/user.model';
import {TmacAuthorizationService} from '../tmacPermission/Authorization.service';

@Component({
  selector: 'app-personal',
  templateUrl: './personal.component.html',
  styleUrls: ['./personal.component.scss']
})
export class PersonalComponent implements OnInit {
  user: User;
  completeDegree: any = 0;

  constructor(private authorizationService: TmacAuthorizationService) {
  }

  ngOnInit() {
    this.user = this.authorizationService.getCurrentUser();
    this.authorizationService.userChange.subscribe(user => {
      this.user = this.authorizationService.getCurrentUser();
      this.initUserBadge();
    });
    this.initUserBadge();
  }

  private initUserBadge() {
    if(this.user){
      const keys = Object.keys(this.user);
      const finishedKeys = keys.filter(key => {
        return this.user[key] && this.user[key] !== '';
      });
      this.completeDegree = (finishedKeys.length / keys.length * 100).toFixed(2);
    }
  }
}
