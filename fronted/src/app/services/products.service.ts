import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from '../models/products';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  selectedProduct: Product;
  product: Product[];
  private URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {
    this.selectedProduct = new Product();
  }

  createProduct(product, photo: File) {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('image', photo);
    return this.http
      .post<Product>(this.URL + '/products', formData)
      .pipe(map((res) => res));
  }

  getProducts() {
    return this.http
      .get<Product>(this.URL + '/products')
      .pipe(map((res) => res));
  }

  getProduct(id: String) {
    return this.http
      .get<Product>(this.URL + '/products' + `/${id}`)
      .pipe(map((res) => res));
  }
  deleteProduct(id: String) {
    return this.http
      .delete<Product>(this.URL + '/products' + `/${id}`)
      .pipe(map((res) => res));
  }
  updateProduct(id: String, product, photo: File) {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('image', photo);
    return this.http
      .put<Product>(this.URL + '/products' + `/${id}`, formData)
      .pipe(map((res) => res));
  }
}
