import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsComponent } from './products.component';
import { PendingChangesGuard } from '../guard/can-deactivate.service';

const productsRoutes: Routes = [
  {
    path: '', component: ProductsComponent,
    children: [
      {
        path: 'add-product', component: AddProductComponent, canDeactivate: [PendingChangesGuard]
      },
      {
        path: 'product-detail', component: ProductDetailComponent, canDeactivate: [PendingChangesGuard]
      },
    ]}
];

@NgModule({
    imports: [RouterModule.forChild(productsRoutes)],
    exports: [RouterModule]
})

export class ProductsRoutingModule {}

