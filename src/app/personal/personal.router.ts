import {Routes} from '@angular/router';
import {PersonalComponent} from './personal.component';
import {PersonalDashboardComponent} from './personal-dashboard/personal-dashboard.component';
import {PersonalAvatarComponent} from './personal-avatar/personal-avatar.component';
import {PersonalAttachComponent} from './personal-attach/personal-attach.component';
import {PersonalWordPreviewComponent} from './personal-word-preview/personal-word-preview.component';
import {PersonalExcelPreviewComponent} from './personal-excel-preview/personal-excel-preview.component';

export const ROUTER_CONFIG: Routes = [
  {
    path: '', component: PersonalComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'dashboard'},
    {path: 'dashboard', component: PersonalDashboardComponent},
    {path: 'avatar', component: PersonalAvatarComponent},
    {path: 'attach', component: PersonalAttachComponent},
    {path: 'word-preview', component: PersonalWordPreviewComponent},
    {path: 'excel-preview', component: PersonalExcelPreviewComponent},
  ]
  }
];
