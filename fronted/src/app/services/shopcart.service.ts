import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/products';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
import * as jwt_decode from 'jwt-decode';
import { User } from '../models/users';
@Injectable({
  providedIn: 'root',
})
export class ShopcartService {
  private URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getCartItems(idUser): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.URL + '/cart' + `/${idUser}`).pipe(
      map((result: any) => {
        let cartItems: CartItem[] = [];
        for (let item of result.carts) {
          cartItems.push(new CartItem(item._id, item.productId, item.userId));
        }
        return result.producto;
      })
    );
  }

  getCartUser(idUser) {
    return this.http.get(this.URL + `/cart/${idUser}`).pipe(
      map((result: any) => {
        return result.carts;
      })
    );
  }

  addProductToCar(product, userId) {
    const data = {
      productId: product._id,
      userId: userId,
    };
    return this.http
      .post<CartItem>(this.URL + '/cart', data)
      .pipe(map((res) => res));
  }
  getUserId() {
    const userId = this.decodeToken().id;
    return userId;
  }
  decodeToken() {
    let token = this.getToken(); //TRAIGO EL TOKEN
    let decode = jwt_decode(token); //LO DE CODIFICO
    return decode; // LO RETORNO, LO USO EN SIGNIN-SIGNUP, ETC.
  }
  getToken() {
    return localStorage.getItem('token');
  }
}
