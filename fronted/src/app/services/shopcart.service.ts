import { Injectable } from '@angular/core';
import { CartItem } from '../models/cart-item';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/products';
import { map } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class ShopcartService {
  private URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getCartItems(): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(this.URL + '/cart').pipe(
      map((result: any[]) => {
        let cartItems: CartItem[] = [];
        for (let item of result) {
          let productExits = false;
          for (let i in cartItems) {
            if (cartItems[i]._id === item.productId) {
              Swal.fire({
                title: 'Ya tienes este producto en tu carrito',
                showClass: {
                  popup: 'animate__headShake',
                },
                hideClass: {
                  popup: 'animate__backOutUp',
                },
              });
              productExits = true;
              break;
            }
          }
          if (!productExits) {
            cartItems.push(new CartItem(item._id, item));
          }
        }
        return cartItems;
      })
    );
  }

  addProductToCar(product: Product): Observable<any> {
    return this.http.post(this.URL + '/cart', product);
  }
}
