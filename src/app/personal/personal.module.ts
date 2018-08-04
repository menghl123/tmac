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
import { PersonalWordPreviewComponent } from './personal-word-preview/personal-word-preview.component';
import { PersonalWordPreviewModalComponent } from './personal-word-preview-modal/personal-word-preview-modal.component';
import { PersonalExcelPreviewComponent } from './personal-excel-preview/personal-excel-preview.component';
import { PersonalExcelPreviewModalComponent } from './personal-excel-preview-modal/personal-excel-preview-modal.component';

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
    PersonalModifyComponent,
    PersonalWordPreviewComponent,
    PersonalWordPreviewModalComponent,
    PersonalExcelPreviewComponent,
    PersonalExcelPreviewModalComponent
  ],
  entryComponents: [
    PersonalAvatarComponent,
    PersonalModifyComponent,
    PersonalWordPreviewModalComponent,
    PersonalExcelPreviewModalComponent
  ],
  providers: [
    PersonalService
  ]
})
export class PersonalModule {
}
