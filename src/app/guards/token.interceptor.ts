import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, take, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';
import { User } from '../model/user.model';
import { JwtResponse } from '../model/jwt-response';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {


    let currentUser: any;

    this.authService.currentUser$.pipe(take(1)).subscribe(user => currentUser = user);

    if (currentUser) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
    }

    return next.handle(request);


    // const token = localStorage.getItem('token');

    // if (token) {
    //   request = request.clone({
    //     setHeaders: { Authorization: `Bearer ${token}` }
    //   });
    // }


    //   if (request.headers.get('No-Auth') === 'True') {
    //     return next.handle(request.clone());
    //   }

    //   const token: any = localStorage.getItem('token');

    //   request = this.addToken(request, token);

    //   return next.handle(request).pipe(
    //     catchError(
    //       (err: HttpErrorResponse) => {
    //         console.log(err.status);
    //         if (err.status === 401) {
    //           this.router.navigate(['/login']);
    //         } else if (err.status === 403) {
    //           this.router.navigate(['/forbidden']);
    //         }
    //         return throwError("Some thing is wrong");
    //       }
    //     )
    //   );
    // }


    // private addToken(request: HttpRequest<any>, token: string) {
    //   return request.clone(
    //     {
    //       setHeaders: {
    //         Authorization: `Bearer ${token}`
    //       }
    //     }
    //   );
    // }



    // const user = this.authService.userValue;
    // // const token = this.authService.userValue.token
    // const isLoggedIn = user && user.token;
    // const isApiUrl = request.url.startsWith(environment.apiUrl);

    // if (isLoggedIn && isApiUrl) {
    //   request = request.clone({
    //     setHeaders: {
    //       Authorization: `Bearer ${user.token}`
    //     }
    //   });
    // }

    // return next.handle(request).pipe(
    //   catchError((err) => {
    //     if (err instanceof HttpErrorResponse) {
    //       console.log(err.url);
    //       if (err.status === 401 || err.status === 403) {
    //         if (this.router.url === '/forbidden') {

    //         } else {
    //           // localStorage.clear();
    //           this.router.navigate(['/login']);
    //         }
    //       }
    //     }
    //     return throwError(err);
    //   })
    // );
  }
}

