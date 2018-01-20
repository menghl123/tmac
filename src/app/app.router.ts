import {Routes} from '@angular/router';
import {AuthLoginPermission} from './tmacPermission/AuthLoginPermission';

export const ROUTER_CONFIG: Routes = [
  {path: '', pathMatch: 'full', redirectTo: '/index/main'},
  {path: 'question', loadChildren: 'app/question/question.module#QuestionModule'},
  {path: 'article', loadChildren: 'app/article/article.module#ArticleModule', canActivate: [AuthLoginPermission]},
  {path: 'index', loadChildren: 'app/index/index.module#IndexModule'},
  {path: 'login', loadChildren: 'app/login/login.module#LoginModule'},
  {path: 'register', loadChildren: 'app/register/register.module#RegisterModule'},
  {path: 'personal', loadChildren: 'app/personal/personal.module#PersonalModule'},
  {path: '**', pathMatch: 'full', redirectTo: '/index/main'},
];
