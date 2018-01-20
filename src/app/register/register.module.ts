import {NgModule} from '@angular/core';
import {RegisterComponent} from './register.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ROUTER_CONFIG} from './register.router';
import {RegisterService} from './service/register.service';
import {UserValidator} from './service/user.validator';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTER_CONFIG)
  ],
  declarations: [RegisterComponent],
  providers: [RegisterService, UserValidator]
})
export class RegisterModule {
}
