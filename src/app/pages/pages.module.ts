import { NgModule } from '@angular/core';
import { NbMenuModule } from '@nebular/theme';

import { ThemeModule } from '../@theme/theme.module';
import { PagesComponent } from './pages.component';
// import { PagesRoutingModule } from './pages-routing.module';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@NgModule({
  imports: [
    // PagesRoutingModule,
    ThemeModule,
    NbMenuModule,
    FormsModule,
    RouterModule
  ],
  declarations: [
    PagesComponent,
  ],
})
export class PagesModule {
}
