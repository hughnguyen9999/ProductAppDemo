import { Injectable } from '@angular/core';
import { Product } from './product/product';
import { catchError, map } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalWarningComponent } from '../modal/modal-warning.component';

@Injectable({
  providedIn: 'root',
})

export class ProductsService {

  // Node/Express API
  apiLink: string = '/api/products';

  // Http Header
  httpHeaders = new HttpHeaders().set('Content-Type', 'application/json');

  emptyProduct: Product = this.createEmptyProduct();
  constructor(
    private httpClient: HttpClient,
    private modalService: NgbModal) { }

  createEmptyProduct(): Product {
    return new Product('', '', '', '', '', null, '', '', '');
  }

  // Add
  addProduct(product: Product): Observable<any> {
    return this.httpClient.post(this.apiLink, product)
      .pipe(
        catchError(this.handleError)
      )
  }

  // Get all objects
  getProducts(): Observable<any> {
    return this.httpClient.get(this.apiLink);
  }

  // Get single object
  getProduct(code: string): Observable<Product> {
    return this.httpClient.get(`${this.apiLink}/${code}`, { headers: this.httpHeaders })
      .pipe(map((res: any) => {
          return res || {}
        }),
        catchError((error) => this.handleError(error))
      )
  }

  // Update
  updateProduct(product: Product): Observable<any> {
    return this.httpClient.put(`${this.apiLink}/${product.code}`, product, { headers: this.httpHeaders })
      .pipe(
        catchError((error) => this.handleError(error))
      )
  }

  // Delete
  deleteProduct(code: string): Observable<any> {
    return this.httpClient.delete(`${this.apiLink}/${code}`, { headers: this.httpHeaders })
      .pipe(
      catchError((error) => this.handleError(error))
    )
  }

  // use modal to show error
  showErrorModal(header: string, content: string) {
    const activeModal = this.modalService.open(ModalWarningComponent, { size: 'sm', container: 'nb-layout' }) ;
    activeModal.componentInstance.modalHeader = header;
    activeModal.componentInstance.modalContent = content;
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
    this.showErrorModal("Error", errorMessage);
    return throwError(errorMessage);
  }
}
