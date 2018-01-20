import {NgModule} from '@angular/core';
import {IndexComponent} from './index.component';
import {MainComponent} from './main/main.component';
import {SharedModule} from '../shared/shared.module';
import {RouterModule} from '@angular/router';
import {ROUTER_CONFIG} from './index.router';
import {CarouselComponent} from './main/carousel/carousel.component';
import {ArticleListComponent} from './main/article-list/article-list.component';
import {IndexService} from './service/index.service';
import { UserInfoComponent } from './main/user-info/user-info.component';
import { RecommendArticleComponent } from './main/recommend-article/recommend-article.component';
import { UserActiveComponent } from './main/user-active/user-active.component';

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(ROUTER_CONFIG)
  ],
  declarations: [IndexComponent, MainComponent, CarouselComponent, ArticleListComponent, UserInfoComponent, RecommendArticleComponent, UserActiveComponent],
  providers: [IndexService]
})
export class IndexModule {
}
