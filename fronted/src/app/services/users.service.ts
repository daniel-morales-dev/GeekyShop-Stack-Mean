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
    return this.http.get<User>(`/user/${userId}`).pipe(map((res) => res));
  }

  updateProfile(userId, User): Observable<User> {
    return this.http.put<User>(`/user/${userId}`, User).pipe(map((res) => res));
  }

  getUsers() {
    return this.http.get(`/user`);
  }

  createUser(User) {
    return this.http.post<User>(`/user`, User).pipe(map((res) => res));
  }

  deleteUser(id, user) {
    return this.http.post(`/user/${id}`, user).pipe(map((res) => res));
  }
}
