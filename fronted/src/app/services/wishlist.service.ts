import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { WishList } from '../models/wishlist';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getWishList(idUser) {
    return this.http.get('/wishlist' + `/${idUser}`).pipe(
      map((result: any) => {
        let productIds = [];
        for (let item of result.products) {
          productIds.push(item._id);
        }
        return productIds;
      })
    );
  }

  addToWishList(product, userId): Observable<any> {
    const data = {
      productId: product._id,
      userId: userId,
    };
    return this.http.post<WishList>('/wishlist', data).pipe(map((res) => res));
  }

  removeFromWishList(userId, productId) {
    return this.http
      .put('/wishlist' + `/${userId}`, productId)
      .pipe(map((res) => res));
  }
}
