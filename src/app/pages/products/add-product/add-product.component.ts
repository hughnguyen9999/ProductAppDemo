import { Component, OnInit, ViewChild, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Product } from '../product/product';
import { ShareDataService } from '../share-data.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'add-product',
  styleUrls: ['../products.component.scss'],
  templateUrl: 'add-product.component.html'
})

export class AddProductComponent implements OnInit {
  inputProduct : Product = this.productsService.createEmptyProduct();
  formChanged: boolean;
  done: boolean = false;
  isEmpty: boolean = false;

  constructor(
    private productsService: ProductsService,
    private router: Router,
    private shareDataService: ShareDataService,
    private toastrService: NbToastrService) { }

  ngOnInit() {}

  // add product after get the infomation
  addProduct(): void {
    this.productsService.addProduct(this.inputProduct).subscribe(
      (result: any) => {
        const newProduct = result.product;
        this.shareDataService.setData('selectedProduct', newProduct);
        this.done = true;
        this.showToast('success', newProduct.name);
        this.router.navigate(['products-list']);
      error => { this.productsService.handleError(error); }
      }
    );
  }

  // cancel adding product and back to products page
  cancelAdding(): void {
    this.router.navigate(['/products']);
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

  // check if there is any value pending for save
  formChange(): void {
    this.formChanged = true;
  }

  // show toast after a product has been created successfully
  showToast(status: string, productName: string): void {
    var position: any = 'bottom-end';
    this.toastrService.show(
      'The product ' + productName + ' has been added successfully',
      'Success',
      { position, status });
  }
}
