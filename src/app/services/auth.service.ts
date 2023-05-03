import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl + "/auth";

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      this.router.navigate(['/']);
      return false;
    } else {
      return true;
    }
  }

  signup(user: User): Observable<User> {
    return this.http.post(this.apiUrl + "/signup", user, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  login(data: any): Observable<any> {
    return this.http.post(this.apiUrl + "/login", data, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  changePassword(data: any) {
    return this.http.post(this.apiUrl + "/changePassword", data);
  }

  checkToken() {
    return this.http.get(this.apiUrl + "/checkToken");
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.clear();
    this.router.navigate(['/']);
  }


}
