import {Routes} from '@angular/router';
import {PersonalComponent} from './personal.component';
import {PersonalDashboardComponent} from './personal-dashboard/personal-dashboard.component';
import {PersonalAvatarComponent} from './personal-avatar/personal-avatar.component';
import {PersonalAttachComponent} from './personal-attach/personal-attach.component';

export const ROUTER_CONFIG: Routes = [
  {
    path: '', component: PersonalComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
    {path: 'dashboard', component: PersonalDashboardComponent},
    {path: 'avatar', component: PersonalAvatarComponent},
    {path: 'attach', component: PersonalAttachComponent},
  ]
  }
];
