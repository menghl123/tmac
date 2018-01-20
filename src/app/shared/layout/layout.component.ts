import {Component, OnInit} from '@angular/core';
import {BreadcrumbService} from '../../core/breadcrumb/breadcrumb.service';
import {TmacAuthorizationService} from '../../tmacPermission/Authorization.service';
import {MenuItem} from '../../components/common/model';
import {Router} from '@angular/router';
import {User} from '../model/user.model';
import {TmacStorageService} from '../../core/storage/storage.service';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  menuItems: MenuItem[];
  breadcrumbsMenuItems: MenuItem[];
  pageInfo: any;
  user: User;

  ngOnInit(): void {
  }

  constructor(private breadcrumbService: BreadcrumbService,
              private storageService: TmacStorageService,
              private router: Router,
              private authorizationService: TmacAuthorizationService) {
    this.user = this.authorizationService.getCurrentUser();
    this.breadcrumbService.breadcrumbsEmitter.subscribe((value) => {
      this.pageInfo = value.pageInfo;
      this.breadcrumbsMenuItems = value.items;
    });
    this.authorizationService.userChange.subscribe((user) => {
      this.menuItems.forEach(menu => {
        if (this.user && menu.label === this.user.username) {
          menu.img = `${environment.api.staticHost}${user.img}`;
          menu.label = user.username;
        }
      });
      this.user = this.authorizationService.getCurrentUser();
    });
    this.generateUserMenuItem();
  }

  showBreadcrumb() {
    return this.router.url.indexOf('/index/') === -1;
  }

  private generateUserMenuItem() {
    this.menuItems = [
      {label: '提问'},
      {label: '写博客', routerLink: '/article/create'},
    ];
    if (this.user) {
      this.menuItems.push({
        label: `${this.user.username}`,
        img: `${environment.api.staticHost}${this.user.img}`,
        children: [
          {label: '我的博客', routerLink: '/article/manage'},
          {label: '个人中心', routerLink: '/personal'},
          {
            label: '退出',
            command: () => {
              this.authorizationService.logout();
              this.authorizationService.userChange.emit(this.user);
              this.user = this.authorizationService.getCurrentUser();
              this.generateUserMenuItem();
              this.router.navigate(['/']);
              this.storageService.clear();
            }
          },
        ]
      });
    } else {
      this.menuItems.push({
          label: `登录`,
          routerLink: '/login'
        },
        {
          label: `注册`,
          routerLink: '/register'
        });
    }

  }
}
