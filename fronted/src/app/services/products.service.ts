import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Product } from '../models/products';
import * as jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  private URL = 'http://localhost:3000';
  selectedProduct: Product;
  products: Product[];
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
      .post<Product>('/products', formData)
      .pipe(map((res) => res));
  }
  getProducts(): Observable<Product> {
    return this.http.get<Product>('/products').pipe(map((res) => res));
  }

  getProduct(id: String) {
    return this.http
      .get<Product>('/products' + `/${id}`)
      .pipe(map((res) => res));
  }
  deleteProduct(id: String) {
    return this.http
      .delete<Product>('/products' + `/${id}`)
      .pipe(map((res) => res));
  }
  updateProduct(id: String, product, photo: File) {
    const formData = new FormData();
    formData.append('name', product.name);
    formData.append('description', product.description);
    formData.append('price', product.price);
    formData.append('image', photo);
    return this.http
      .put<Product>('/products' + `/${id}`, formData)
      .pipe(map((res) => res));
  }

  canManageProduct() {
    if (localStorage.getItem('token')) {
      const rol = this.decodeToken().rol;
      if (rol == 'empleado' || rol == 'admin') {
        return true;
      }
    }
  }
  //DECODIFICO EL TOKEN PARA SACAR LOS DATOS QUE ENVIO DESDE EL BACKEND
  decodeToken() {
    let token = localStorage.getItem('token'); //TRAIGO EL TOKEN
    let decode = jwt_decode(token); //LO DECODIFICO
    return decode; // LO RETORNO, LO USO EN SIGNIN-SIGNUP, ETC.
  }
}
