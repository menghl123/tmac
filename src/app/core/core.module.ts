import {NgModule} from '@angular/core';
import {BreadcrumbService} from './breadcrumb/breadcrumb.service';
import {AdminlteModule} from '../components/adminlte.module';
import {TmacHttpModule} from '../tmacHttp/tmac-http.module';
import {LoadingService} from './loading/loading.service';
import {TmacStorageService} from './storage/storage.service';
import {TmacPermissionModule} from '../tmacPermission/rebirth-permission.module';
import {LoginService} from './login/login.service';
import {FileUploadService} from './fileUpload/file-upload.service';

@NgModule({
  imports: [
    AdminlteModule.forRoot(),
    TmacPermissionModule.forRoot({loginPage: '/login'}),
    TmacHttpModule
  ],
  declarations: [],
  providers: [
    BreadcrumbService,
    LoadingService,
    TmacStorageService,
    LoginService,
    FileUploadService
  ],
  exports: [TmacHttpModule]
})
export class CoreModule {
}
