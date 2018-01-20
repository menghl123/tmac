import {NgModule} from '@angular/core';
import {ArticleComponent} from './article.component';
import {CreateArticleComponent} from './edit-article/edit-article.component';
import {SharedModule} from '../shared/shared.module';
import {ROUTER_CONFIG} from './article.router';
import {RouterModule} from '@angular/router';
import {ArticleService} from './service/article.service';
import {ManageArticleComponent} from './manage-article/manage-article.component';
import {DetailArticleComponent} from './detail-article/detail-article.component';
import {CommentService} from './service/comment.service';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTER_CONFIG)
  ],
  declarations: [ArticleComponent, CreateArticleComponent, ManageArticleComponent, DetailArticleComponent],
  providers: [ArticleService, CommentService],
  exports: [ArticleComponent, CreateArticleComponent, ManageArticleComponent, DetailArticleComponent],
  entryComponents:[ArticleComponent, CreateArticleComponent, ManageArticleComponent, DetailArticleComponent]
})
export class ArticleModule {
}
