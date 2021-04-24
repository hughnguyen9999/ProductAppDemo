import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { ProductsRoutingModule } from './products-routing.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NbCardModule } from '@nebular/theme';
import { ProductsService } from './products.service';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ShareDataService } from './share-data.service';
import { PendingChangesGuard } from '../guard/can-deactivate.service';
import { ModalWarningComponent } from '../modal/modal-warning.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule,
    ProductsRoutingModule,
    NgxDatatableModule,
    NbCardModule,
    FormsModule
  ],
  declarations: [
    ProductsComponent,
    AddProductComponent,
    ProductDetailComponent,
    ModalWarningComponent
  ],
  providers: [
    ProductsService,
    ShareDataService,
    PendingChangesGuard
  ],
  entryComponents: [
    ModalWarningComponent
  ]
})
export class ProductsModule { }
