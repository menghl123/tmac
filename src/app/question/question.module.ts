import {NgModule} from '@angular/core';
import {QuestionComponent} from './question.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ROUTER_CONFIG} from './question.router';
import {CreateComponent} from './create/create.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTER_CONFIG)
  ],
  declarations: [QuestionComponent, CreateComponent]
})
export class QuestionModule { }
