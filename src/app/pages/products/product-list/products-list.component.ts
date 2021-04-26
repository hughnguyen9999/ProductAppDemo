import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { ProductsService } from '../products.service';
import { Product } from '../product/product';
import { Router } from '@angular/router';
import { ShareDataService } from '../share-data.service';


@Component({
  selector: 'products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['../products.component.scss'],
  encapsulation: ViewEncapsulation.None
})

export class ProductsListComponent implements OnInit {
  @ViewChild('myTable') table: any;
  products: Product[] = [];
  selectedProduct: Product = this.productsService.createEmptyProduct();
  selectedProducts: Product[] = [];
  addProductUrl: string = "products/add-product";
  productDetailUrl: string = "products/product-detail";

  constructor(
    private productsService: ProductsService,
    private shareDataService: ShareDataService,
    private router: Router) { }

  ngOnInit() {
    this.productsService.getProducts().subscribe(
      (data: any[]) => { this.products = data },
      error => { console.error(error) }
    );
  }

  onSelect(event: any): void {
    this.selectedProducts = event.selected;
    this.selectedProduct = this.selectedProducts[this.selectedProducts.length - 1];
    this.shareDataService.setData('selectedProduct', this.selectedProduct);
    this.router.navigate([this.productDetailUrl]);
  }

  onAddProduct(): void {
    this.router.navigate([this.addProductUrl]);
  }
}
