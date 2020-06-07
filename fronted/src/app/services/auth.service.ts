import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';
import * as jwt_decode from 'jwt-decode';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private URL = 'http://localhost:3000';
  constructor(private http: HttpClient, private router: Router) {}

  signUp(user) {
    return this.http
      .post<any>(this.URL + '/signup', user)
      .pipe(map((res) => res));
  }

  signIn(user): Observable<any> {
    return this.http
      .post<any>(this.URL + '/signin', user)
      .pipe(map((res) => res));
  }

  loggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
  }

  getToken() {
    return localStorage.getItem('token');
  }

  isAdmin() {
    if (this.loggedIn) {
      const rol = this.decodeToken().rol;
      if (rol != 'admin') {
        return false;
      }
    }
    return true;
  }

  isEmployee() {
    if (this.loggedIn) {
      const rol = this.decodeToken().rol;
      if (rol != 'empleado' && rol != 'admin') {
        return false;
      }
    }
    return true;
  }

  logOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('datos');
    this.router.navigate(['/home']);
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  //DECODIFICO EL TOKEN PARA SACAR LOS DATOS QUE ENVIO DESDE EL BACKEND
  decodeToken() {
    let token = this.getToken(); //TRAIGO EL TOKEN
    let decode = jwt_decode(token); //LO DE CODIFICO
    return decode; // LO RETORNO, LO USO EN SIGNIN-SIGNUP, ETC.
  }
}
