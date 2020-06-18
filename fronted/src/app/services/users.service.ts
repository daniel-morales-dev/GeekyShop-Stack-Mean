import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/users';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private URL = 'http://localhost:3000';
  constructor(private http: HttpClient) {}
  getProfile(userId): Observable<User> {
    return this.http
      .get<User>(this.URL + `/user/${userId}`)
      .pipe(map((res) => res));
  }

  updateProfile(userId, User): Observable<User> {
    return this.http
      .put<User>(this.URL + `/user/${userId}`, User)
      .pipe(map((res) => res));
  }
}
