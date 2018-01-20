import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {LayoutComponent} from './layout/layout.component';
import {AdminlteModule} from '../components/adminlte.module';
import { TableComponent } from './table/table.component';
import { PaginatorComponent } from './paginator/paginator.component';
import {RouterModule} from '@angular/router';
import {CKEditorModule} from 'ng2-ckeditor';
import {ArticleStatusPipe} from './pipe/article-status.pipe';
import {NaturePipe} from './pipe/nature-pipe.pipe';
import { ImgUrlPipe } from './img-url/img-url.pipe';

@NgModule({
  imports: [
    CommonModule,
    AdminlteModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CKEditorModule,
  ],
  declarations: [
    LayoutComponent,
    TableComponent,
    PaginatorComponent,
    ArticleStatusPipe,
    NaturePipe,
    ImgUrlPipe
  ],
  exports: [
    LayoutComponent,
    AdminlteModule,
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    TableComponent,
    CKEditorModule,
    ArticleStatusPipe,
    NaturePipe,
    ImgUrlPipe
  ]
})
export class SharedModule {
}
