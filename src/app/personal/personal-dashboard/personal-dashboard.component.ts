import {Component, OnInit} from '@angular/core';
import {PersonalService} from '../service/personal.service';
import {TmacAuthorizationService} from '../../tmacPermission/Authorization.service';
import {User} from '../../shared/model/user.model';

@Component({
  selector: 'app-personal-dashboard',
  templateUrl: './personal-dashboard.component.html',
  styleUrls: ['./personal-dashboard.component.scss']
})
export class PersonalDashboardComponent implements OnInit {
  user: User;
  dashboardInfo: { [key: string]: any };

  constructor(private personalService: PersonalService,
              private authorizationService: TmacAuthorizationService) {
    this.user = this.authorizationService.getCurrentUser();
    this.personalService.dashboard(this.user.id).subscribe((dashboardInfo) => {
      this.dashboardInfo = dashboardInfo;
    });
  }

  ngOnInit() {
  }

}
