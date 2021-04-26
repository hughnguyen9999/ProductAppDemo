import { Component } from '@angular/core';
import { MENU_ITEMS } from '../pages-menu';

@Component({
  selector: 'products',
  styleUrls: ['products.component.scss'],
  template: `
    <ngx-one-column-layout>
      <nb-menu [items]="menu"></nb-menu>
      <router-outlet></router-outlet>
    </ngx-one-column-layout>
  `,
})

export class ProductsComponent {

  menu = MENU_ITEMS;
}
