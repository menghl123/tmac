import {NgModule} from '@angular/core';
import {LoginComponent} from './login.component';
import {ROUTER_CONFIG} from './login.router';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTER_CONFIG)
  ],
  declarations: [LoginComponent],
})
export class LoginModule {
}
