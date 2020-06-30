import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../models/users';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  selectedUser: User;
  users: User[];
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

  getUsers() {
    return this.http.get(this.URL + `/user`);
  }

  createUser(User) {
    return this.http
      .post<User>(this.URL + `/user`, User)
      .pipe(map((res) => res));
  }

  deleteUser(id, user) {
    return this.http
      .post(this.URL + `/user/${id}`, user)
      .pipe(map((res) => res));
  }
}
