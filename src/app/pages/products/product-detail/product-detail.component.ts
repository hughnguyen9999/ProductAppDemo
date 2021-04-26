import { Component, HostListener, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { Product } from '../product/product';
import { ShareDataService } from '../share-data.service';
import { Observable } from 'rxjs/Observable';
import { ProductsListComponent } from '../product-list/products-list.component';
import { HttpErrorResponse } from '@angular/common/http';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'product-detail',
  styleUrls: ['../products.component.scss'],
  templateUrl: './product-detail.component.html'
})

export class ProductDetailComponent implements OnInit {

  editingProduct: Product = this.productsService.createEmptyProduct();
  inputName: string = '';
  inputDescription : string = '';
  formChanged: boolean = false;
  done: boolean = false;
  isEmpty: boolean = false;
  difference: boolean = false;
  productsURL: string = '/products';
  oldPro: Product = this.productsService.createEmptyProduct();

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private shareDataService: ShareDataService,
    private toastrService: NbToastrService) { }

  ngOnInit() {
    this.getProductToEdit();
  }

  // get the infor of the editing product
  getProductToEdit(): void {
    if (typeof this.shareDataService.getData('selectedProduct') !== 'undefined') {
      const selectedProduct = this.shareDataService.getData('selectedProduct');
      this.productsService.getProduct(selectedProduct.code)
        .subscribe(product => {
          this.editingProduct = product;
        }
      );
    }
  }

  // on Update button clicked
  onEditProduct(): void {
    this.productsService.updateProduct(this.editingProduct).subscribe((result: any): void =>
    {
      const newProduct = result.product;
      this.shareDataService.setData('selectedProduct', newProduct);
      this.done = true;
      this.showToast('success', newProduct.name, 'updated');
      this.router.navigateByUrl(this.productsURL);
    },
    (error: HttpErrorResponse): void => {
        this.productsService.handleError(error);
      }
    );
  }

  // on Delete button clicked
  onDeleteProduct(): void {
    const deletedProductName = this.editingProduct.name;
    this.productsService.deleteProduct(this.editingProduct.code).subscribe((): void =>
    {
      this.done = true;
      this.showToast('success', deletedProductName, 'deleted');
      this.router.navigateByUrl(this.productsURL);
    },
    (error: HttpErrorResponse): void => {
        this.productsService.handleError(error);
      }
    );
  }

  // check if there is any value pending for save
  formChange(): void {
    this.formChanged = true;
  }

  //warning when browsing away during editing
  @HostListener('window:beforeunload')
  canDeactivate(): Observable<boolean> | boolean {
    if (!this.formChanged || this.done) {
      return true;
    } else {
      return false;
    }
  }

  // cancel editing and back to products page
  cancelEditing(): void {
    this.router.navigateByUrl(this.productsURL);
  }

  // show toast after a product has been updated or deleted successfully
  showToast(status: string, productName: string, action: string): void {
    var position: any = 'bottom-end';
    this.toastrService.show(
      'The product ' + productName + ' has been ' + action + ' successfully',
      'Success',
      { position, status });
  }
}
