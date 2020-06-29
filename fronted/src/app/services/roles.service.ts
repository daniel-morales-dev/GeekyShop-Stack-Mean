import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}

  getRoles() {
    return this.http.get(`/rol`).pipe(map((res) => res));
  }
}
