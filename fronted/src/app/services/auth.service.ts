import { Injectable } from "@angular/core";
import { HttpClient, HttpInterceptor } from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private URL = "http://localhost:3000";
  constructor(private http: HttpClient, private router: Router) {}

  signUp(user) {
    return this.http
      .post<any>(this.URL + "/signup", user)
      .pipe(map((res) => res));
  }

  signIn(user): Observable<any> {
    return this.http
      .post<any>(this.URL + "/signin", user)
      .pipe(map((res) => res));
  }

  loggedIn() {
    if (localStorage.getItem("token")) {
      return true;
    }
  }

  getToken() {
    return localStorage.getItem("token");
  }

  getUser(){
    return JSON.parse(localStorage.getItem("datos"));
  }

  logOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("datos");
    this.router.navigate(["/home"]);
  }

  setToken(token) {
    localStorage.setItem("token", token);
  }

  setUser(user) {
    localStorage.setItem("datos", JSON.stringify(user));
  }
}
