import { Component, OnInit, ViewChild, HostListener, Input, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../products.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';
import { Product } from '../product/product';
import { ShareDataService } from '../share-data.service';
import { Observable } from 'rxjs/internal/Observable';

@Component({
  selector: 'add-product',
  templateUrl: 'add-product.component.html'
})

export class AddProductComponent implements OnInit {
  inputProduct : Product = this.productsService.createEmptyProduct();
  newProduct: any;
  productExist: boolean;
  nameDisabled: boolean;
  pathDisabled: boolean;
  inputCharacter: string;
  maxProductNameReach: boolean = false;
  productNameValid: boolean = true;
  maxproductPathReach: boolean;
  formChanged: boolean;
  done: boolean = false;
  invalidKeys: string[] = ['/','\\'];
  inputCharacters: string[] = [];
  isEmpty: boolean = false;

  constructor(private productsService: ProductsService, private router: Router, private shareDataService: ShareDataService) { }

  ngOnInit() {
  }

  // add product after get the infomation
  addProduct() {
    this.productsService.addProduct(this.inputProduct).subscribe(
      result => {
      this.newProduct = result;
      this.shareDataService.setData('selectedProduct', this.newProduct);
      this.router.navigate(['cftp/products']);
      error => { this.productsService.handleError(error); }
      }
    );
  }

  // cancel adding product and back to products page
  cancelAdding() {
    this.router.navigate(['/products']);
  }

  //check if the product name and path is empty or not
  checkEmptyProductName(productName) {
    if (productName.trim() == '') {
        this.isEmpty = true;
    } else {
        this.isEmpty = false;
    }
  }

    // paste during input product name
  productNamePaste(event) {
    // prevent user input empty username
    let productName = event.clipboardData.getData('text/plain');
    // show characters which is not allowed
    if (event.key != "Shift") {
      this.inputCharacter = event.key;
      }
      // prevent user input empty username
      if (productName == '') {
      this.productExist = false;
      }
      // warning user about max length has reached
      this.maxProductNameReach = false;
      if (productName.length >= 100) {
      this.maxProductNameReach = true;
      this.productExist = false;
      }
    this.inputCharacters = this.inputCharacters.filter(i => productName.includes(i));
    this.checkEmptyProductName(productName);
  }

    // key down during input product name
    productNameKeyDown(event) {
      // show characters which is not allowed
      if ((event.key !== "Shift") && (this.invalidKeys.includes(event.key))) {
      this.inputCharacters.push(event.key);
      }
    }

    // key up during input product name
    productNameKeyUp(event) {
      //show characters which is not allowed
      if (event.key != "Shift") {
      this.inputCharacter = event.key;
      }
      // prevent user input empty username
      if (this.inputProduct.name == '') {
      this.productExist = false;
      this.inputProduct.name = event.target.value.trim();
      }
      // warning user about max length has reached
      this.maxProductNameReach = false;
      if (this.inputProduct.name.length >= 100) {
      this.maxProductNameReach = true;
      this.productExist = false;
      }
      this.inputCharacters = this.inputCharacters.filter(i => this.inputProduct.name.includes(i));
      this.checkEmptyProductName(this.inputProduct.name);
    }

    // trim the userName after change
    productNameChange(event) {
      this.inputProduct.name = event.target.value.trim();
      this.formChange();
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
  formChange() {
    this.formChanged = true;
  }
}
