
import {MenuItem} from './components/common/model';
export const demoMenuItems: MenuItem[] = [
  {
    routerLink: 'dashboard',
    label: '图盘表',
    icon: 'fa-dashboard'
  },
  {
    routerLink: 'system',
    label: '系统管理',
    icon: 'fa-cog',
    children: [{
      routerLink: 'system/user',
      label: '用户管理',
      icon: 'fa-user'
    },
      {
        routerLink: 'system/role',
        label: '角色管理',
        icon: 'fa-user-o'
      },
      {
        routerLink: 'system/function',
        label: '功能管理',
        icon: 'fa-check-square'
      },
      {
        routerLink: 'system/menu',
        label: '菜单管理',
        icon: 'fa-navicon'
      }
    ]
  }
];
