import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NbCardModule, NbMenuModule } from '@nebular/theme';
import { ProductsService } from './products.service';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShareDataService } from './share-data.service';
import { PendingChangesGuard } from '../guard/can-deactivate.service';
import { ModalWarningComponent } from '../modal/modal-warning.component';
import { FormsModule } from '@angular/forms';
import { ProductsListComponent } from './product-list/products-list.component';
import { RouterModule } from '@angular/router';
import { ThemeModule } from '../../@theme/theme.module';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalChangeGuardComponent } from '../modal/modal-change-guard.component';


@NgModule({
  imports: [
    ThemeModule,
    NbMenuModule,
    FormsModule,
    RouterModule,
    CommonModule,
    ProductsRoutingModule,
    NgxDatatableModule,
    NbCardModule,
    FormsModule
  ],
  declarations: [
    ProductsComponent,
    ProductsListComponent,
    AddProductComponent,
    ProductDetailComponent,
    ModalWarningComponent,
    ModalChangeGuardComponent
  ],
  providers: [
    ProductsService,
    ShareDataService,
    PendingChangesGuard,
    NgbActiveModal
  ],
  entryComponents: [
    ModalWarningComponent,
    ModalChangeGuardComponent
  ]
})
export class ProductsModule { }
