import {Routes} from '@angular/router';
import {QuestionComponent} from './question.component';
import {CreateComponent} from './create/create.component';

export const ROUTER_CONFIG: Routes = [
  {
    path: '', component: QuestionComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'create'},
    {path: 'create', component: CreateComponent}
  ]
  }
];
