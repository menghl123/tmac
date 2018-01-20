import {NgModule} from '@angular/core';
import {PersonalComponent} from './personal.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ROUTER_CONFIG} from './personal.router';
import {PersonalDashboardComponent} from './personal-dashboard/personal-dashboard.component';
import {PersonalAvatarComponent} from './personal-avatar/personal-avatar.component';
import {PersonalAttachComponent} from './personal-attach/personal-attach.component';
import {PersonalService} from './service/personal.service';
import { PersonalModifyComponent } from './personal-modify/personal-modify.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTER_CONFIG)
  ],
  declarations: [
    PersonalComponent,
    PersonalDashboardComponent,
    PersonalAvatarComponent,
    PersonalAttachComponent,
    PersonalModifyComponent
  ],
  entryComponents: [
    PersonalAvatarComponent,
    PersonalModifyComponent
  ],
  providers: [
    PersonalService
  ]
})
export class PersonalModule {
}
