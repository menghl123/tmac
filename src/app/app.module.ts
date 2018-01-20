import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';

import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {CoreModule} from './core/core.module';
import {RouterModule} from '@angular/router';
import {ROUTER_CONFIG} from './app.router';
import {ArticleModule} from './article/article.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(ROUTER_CONFIG),
    SharedModule,
    CoreModule,
  ],
  providers: [
  {provide: LocationStrategy, useClass: HashLocationStrategy},
],
  bootstrap: [AppComponent]
})
export class AppModule {
}
