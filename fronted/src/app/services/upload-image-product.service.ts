import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class UploadIMageProductService {
  private URL = 'http://localhost:3000';
  constructor(private http: HttpClient, private router: Router) {}

  uploadImage(formData) {
    return this.http
      .post<any>(this.URL + '/uploadImageProduct', formData)
      .pipe(map((res) => res));
  }
}
