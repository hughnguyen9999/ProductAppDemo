import { Component, HostListener, OnInit } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { Product } from '../product/product';
import { ShareDataService } from '../share-data.service';
import { Observable } from 'rxjs/Observable';

@Component({
    selector: 'product-detail',
    templateUrl: './product-detail.component.html'
})

export class ProductDetailComponent implements OnInit {

  editingProduct: Product = this.productsService.createEmptyProduct();
  inputName: string = '';
  inputDescription : string = '';
  formChanged: boolean = false;
  done: boolean = false;
  isEmpty: boolean;
  difference: boolean = false;
  productsURL = '/products';

  constructor(private productsService: ProductsService, private router: Router, private shareDataService: ShareDataService) { }

  ngOnInit() {
    this.getProductToEdit();
  }

  // get the infor of the editing product
  getProductToEdit() {
    if (this.shareDataService.getData('selectedProduct')) {
      this.productsService.getProduct(this.shareDataService.getData('selectedProduct').id)
        .subscribe(product => {
          this.editingProduct = product;
          this.inputName = this.editingProduct.name;
          this.inputDescription = this.editingProduct.description
        }
      );
    }
  }

  // on Done button clicked
  onEditProduct() {
    this.productsService.updateProduct(this.editingProduct).subscribe(newProduct =>
      {
        this.shareDataService.setData('selectedProduct', newProduct);
        this.router.navigateByUrl(this.productsURL);
      },
        error => {
          this.productsService.handleError(error);
      }
    );
  }

  // check if there is any value pending for save
  formChange() {
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

  // cancel editing and back to folders page
  cancelEditing() {
    this.router.navigateByUrl(this.productsURL);
  }
}
