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
  private currentUserSource: BehaviorSubject<Partial<JwtResponse>>;
  public currentUser$!: Observable<Partial<JwtResponse>>

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.currentUserSource = new BehaviorSubject<Partial<JwtResponse>>(
      {token: localStorage.getItem('token') ||'',
      user: JSON.parse(localStorage.getItem('user') || '{}').user
    }
    );
    this.currentUser$ = this.currentUserSource.asObservable();

  }

  public get userValue(): Partial<JwtResponse> {
    return this.currentUserSource.value;
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

  changePassword(data: any) :Observable<string> {
    return this.http.post<string>(this.apiUrl + "/change-password", data);
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
    this.currentUserSource.next({});
    this.router.navigate(['/login']);
  }


}
