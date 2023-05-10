import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';
import { Router } from '@angular/router';
import { JwtResponse } from '../model/jwt-response';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl = environment.apiUrl + "/auth";
  private currentUserSource: BehaviorSubject<any>;
  public currentUser$!: Observable<any>

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSource = new BehaviorSubject<any>(localStorage.getItem('token'));
    this.currentUser$ = this.currentUserSource.asObservable();

  }

  public get userValue(): JwtResponse {
    return this.currentUserSource.value;
  }

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
    return this.http.post(this.apiUrl + '/register', user);
  }

  login(data: User): Observable<any> {
    return this.http.post<JwtResponse>(this.apiUrl + "/login", data)
      .pipe(
        map((response: any) => {
          const user = response;
          console.log('user: ', user);
          if (user) {
            localStorage.setItem('user', JSON.stringify(user))
            localStorage.setItem('token', user?.token)
            this.currentUserSource.next(user)
          }
        })
      );
  }

  changePassword(data: any) {
    return this.http.post(this.apiUrl + "/changePassword", data);
  }

  checkToken() {
    return this.http.get(this.apiUrl + "/checkToken");
  }

  getUser() {
    let user = localStorage.getItem('user');
    if (user != null) {
      return JSON.parse(user);
    } else {
      this.logout();
      return null;
    }
  }

  getUserRole() {
    let user = this.getUser();
    return user.user.role;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.router.navigate(['/']);
  }


}
