import {Routes} from '@angular/router';
import {IndexComponent} from './index.component';
import {MainComponent} from './main/main.component';

export const ROUTER_CONFIG: Routes = [
  {
    path: '', component: IndexComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'main'},
    {path: 'main', component: MainComponent},
  ]
  }
];
