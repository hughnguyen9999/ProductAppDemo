import { Injectable } from '@angular/core';
import { Product } from './product/product';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';

@Injectable()

export class ProductsService {

  // Node/Express API
  apiLink: string = '/api/products';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  emptyProduct: Product = this.createEmptyProduct();

  constructor(private httpClient: HttpClient) { }

  createEmptyProduct() {
    var product = new Product('', '', '', '', '', null, '', '', '');
    return product;
  }

  // Add
  addProduct(product: Product): Observable<any> {
    let API_URL = `${this.apiLink}`;
    return this.httpClient.post(API_URL, product)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get all objects
  getProducts() {
    return this.httpClient.get(`${this.apiLink}`);
  }

  // Get single object
  getProduct(id:number): Observable<Product> {
    let API_URL = `${this.apiLink}/${id}`;
    return this.httpClient.get(API_URL, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError(this.handleError)
      )
  }

  // Update
  updateProduct(product:Product): Observable<any> {
    let API_URL = `${this.apiLink}/${product.id}`;
    return this.httpClient.put(API_URL, product, { headers: this.httpHeaders })
      .pipe(
        catchError(this.handleError)
      )
  }

  // Delete
  deleteProduct(id:any): Observable<any> {
    let API_URL = `${this.apiLink}/${id}`;
    return this.httpClient.delete(API_URL, { headers: this.httpHeaders}).pipe(
        catchError(this.handleError)
      )
  }


  // Error
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Handle client error
      errorMessage = error.error.message;
    } else {
      // Handle server error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
