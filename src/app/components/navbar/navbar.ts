import {CommonModule} from '@angular/common';
import {Component, ElementRef, EventEmitter, HostListener, Input, NgModule, OnInit, Output} from '@angular/core';
import {MenuItem} from '../common/model';
import {RouterModule} from '@angular/router';
import {AdminlteNGConfig} from '../adminlte.config';
import {removeNgTag} from '../utils/dom-utils';

@Component({
  selector: 'lte-navbar-menu',
  template: `
    <div class="collapse navbar-collapse pull-{{position}}" [ngClass]="{'in':collapsed}">
      <ul class="nav navbar-nav">
        <ng-container *ngFor="let menuItem of menuItems">
          <li *ngIf="!menuItem.children" (click)="menuItemClick(menuItem)"
              [ngClass]="{'active':menuItem?.$routerLinkActive}">
            <a [routerLink]="menuItem?.routerLink">
              <img *ngIf="menuItem?.img" src="{{menuItem?.img}}" class="user-image">
              <span>{{menuItem?.label}}</span>
            </a>
          </li>
          <li *ngIf="menuItem.children" class="dropdown" [ngClass]="{'open':menuItem.$expand }"
              (click)="menuItemClick(menuItem)">
            <ng-container *ngIf="menuItem?.routerLink">
              <a [routerLink]="menuItem?.routerLink">
                <img *ngIf="menuItem?.img" src="{{menuItem?.img}}" class="user-image">
                <span>
                    {{menuItem?.label}}
                    <span class="caret"></span>
                  </span>
              </a>
            </ng-container>
            <ng-container *ngIf="!menuItem?.routerLink">
              <a (click)="itemClick(menuItem)">
                <img *ngIf="menuItem?.img" src="{{menuItem?.img}}" class="user-image">
                <span>
                    {{menuItem?.label}}
                    <span class="caret"></span>
                  </span>
              </a>
            </ng-container>
            <ul class="dropdown-menu">
              <li [ngClass]="{'active':menuItem?.$routerLinkActive}" *ngFor="let child of menuItem?.children">
                <a (click)="itemClick(child)" [routerLink]="child?.routerLink">{{child?.label}}</a>
              </li>
            </ul>
          </li>
        </ng-container>
      </ul>
    </div>
  `
})
export class LteNavbarMenu implements OnInit {
  @Input()
  menuItems: MenuItem[] = [];

  @Input()
  position: 'left' | 'right';

  collapsed: boolean;

  @Output()
  onItemClick: EventEmitter<MenuItem> = new EventEmitter();

  @Output()
  onExpand: EventEmitter<MenuItem> = new EventEmitter();


  constructor(private adminlteNGConfig: AdminlteNGConfig,
              private el: ElementRef) {
    this.position = <any>this.adminlteNGConfig.navbar.position;
    this.collapsed = <any>this.adminlteNGConfig.navbar.collapsed;
  }

  ngOnInit(): void {
    if (document.body.clientHeight < 768) {
      this.toggle();
    }
    const nativeElement = this.el.nativeElement;
    removeNgTag(nativeElement);
  }

  itemClick(menuItem) {
    if (menuItem.command) {
      menuItem.command();
    }
  }

  menuItemClick(clickedMenuItem: MenuItem) {
    this.menuItems.forEach(menuItem => {
      if (menuItem !== clickedMenuItem) {
        menuItem.$expand = false;
        menuItem.$routerLinkActive = false;
      }
    });
    this.onItemClick.emit(clickedMenuItem);
    if (clickedMenuItem.children) {
      this.onExpand.emit(clickedMenuItem);
      clickedMenuItem.$expand = !clickedMenuItem.$expand;
      event.preventDefault();
      event.stopPropagation();
    } else {
      clickedMenuItem.$routerLinkActive = true;
    }
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(e) {
    this.menuItems.forEach(menuItem => menuItem.$expand = false);
  }

  toggle() {
    this.collapsed = !this.collapsed;
  }

}

@Component({
  selector: 'lte-navbar-custom-menu',
  template: `
    <div class="navbar-custom-menu">
      <ul class="nav navbar-nav">
        <li>
          <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
        </li>
      </ul>
    </div>
  `
})
export class LteNavbarCustomMenu {
  @Input()
  menuItems: MenuItem[];

  constructor() {

  }

}

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  declarations: [LteNavbarMenu, LteNavbarCustomMenu,],
  exports: [LteNavbarMenu, LteNavbarCustomMenu,]
})
export class NavbarModule {

}
