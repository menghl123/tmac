import {Routes} from '@angular/router';
import {ArticleComponent} from './article.component';
import {CreateArticleComponent} from './edit-article/edit-article.component';
import {ManageArticleComponent} from './manage-article/manage-article.component';
import {DetailArticleComponent} from './detail-article/detail-article.component';

export const ROUTER_CONFIG: Routes = [
  {
    path: '', component: ArticleComponent, children: [
    {path: '', pathMatch: 'full', redirectTo: 'create'},
    {path: 'create', component: CreateArticleComponent},
    {path: 'modify/:id', component: CreateArticleComponent},
    {path: 'manage', component: ManageArticleComponent},
    {path: 'detail/:id', component: DetailArticleComponent}
  ]
  }
];
