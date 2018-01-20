import {Component, ViewContainerRef} from '@angular/core';
import {BreadcrumbService} from './core/breadcrumb/breadcrumb.service';
import {LoadingService} from './core/loading/loading.service';
import {AdminlteNGConfig} from './components/adminlte.config';
import {TmacStorageService} from './core/storage/storage.service';
import {TmacHttpConfig} from './tmacHttp/tmac-http-config';
import {Router} from '@angular/router';
import {DialogService} from './components/dialog/dialog.service';
import {environment} from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  private AUTHORIZATION = 'Authorization';

  constructor(private breadcrumbService: BreadcrumbService,
              private loadingService: LoadingService,
              private viewContainerRef: ViewContainerRef,
              private adminlteNGConfig: AdminlteNGConfig,
              private dialogService: DialogService,
              private storageService: TmacStorageService,
              private router: Router,
              private tmacHttpConfig: TmacHttpConfig) {
    this.adminlteNGConfig.rootContainer = this.viewContainerRef; // this.rebirthNGConfig.extend(REBIRTH_UI_I18N_ZHCN); i18n
    this.tmacHttpConfig
      .setBaseUrl(environment.api.host)
      .setInterceptor({
        request: (req) => {
          if (req && req.params && req.params.get('ignoreLoading')) {
            return;
          }
          this.loadingService.show();
        },
        response: (res) => this.loadingService.hide()
      }).setInterceptor({
      request: (req) => {
        const authorization = this.storageService.get(this.AUTHORIZATION);
        if (authorization) {
          return req.clone({headers: req.headers.set('Authorization', authorization)});
        }
      },
      response: (res: any) => {
        const authorization = res.headers.get(this.AUTHORIZATION);
        if (authorization) {
          this.storageService.save(this.AUTHORIZATION, authorization);
        }
      }
    }).setInterceptor({
      request: () => {
      },
      response: (res: any) => {
        if (res && res.status === 403) {
          this.dialogService.alert({
            title: '错误',
            content: `无权限访问${res.error.path}`,
            yes: '确定',
            cssClass: 'modal-danger',
          })
            .subscribe(
              () => {
                this.router.navigate(['/index/main']);
              },
              () => {
                this.router.navigate(['/index/main']);
              }
            );
        }
      }
    });
    this.breadcrumbService.breadcrumbsEmitter.emit({
      items: [{
        icon: 'fa-dashboard',
        label: '主页',
        routerLink: '/index'
      }]
    });
  }
}
