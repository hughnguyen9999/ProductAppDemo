import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { ProductsListComponent } from './product-list/products-list.component';
import { PendingChangesGuard } from '../guard/can-deactivate.service';
import { ProductsComponent } from './products.component';

const productsRoutes: Routes = [
  {
    path: '', component: ProductsComponent,
    children: [
      {
        path: 'products-list', component: ProductsListComponent
      },
      {
        path: 'add-product', component: AddProductComponent, canDeactivate: [PendingChangesGuard]
      },
      {
        path: 'product-detail', component: ProductDetailComponent, canDeactivate: [PendingChangesGuard]
      },
      {
        path: '', redirectTo: 'products-list', pathMatch: 'full',
      }
    ]
  },
];

@NgModule({
    imports: [RouterModule.forChild(productsRoutes)],
    exports: [RouterModule]
})

export class ProductsRoutingModule {}

