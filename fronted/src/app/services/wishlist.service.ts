import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WishlistService {
  private URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getWishList() {
    return this.http.get(this.URL + '/wishlist').pipe(
      map((result: any[]) => {
        let productIds = [];
        result.forEach((item) => {
          productIds.push(item.productId);
        });
        return productIds;
      })
    );
  }

  addToWishList(productId): Observable<any> {
    return this.http
      .post(this.URL + '/wishlist', productId)
      .pipe(map((res) => res));
  }

  removeFromWishList(productId) {
    return this.http
      .delete(this.URL + '/wishlist' + `/${productId}`)
      .pipe(map((res) => res));
  }
}
