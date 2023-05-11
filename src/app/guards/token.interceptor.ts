import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse
} from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { environment } from 'src/environments/environment';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService: AuthService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // const token = localStorage.getItem('token');

    // if (token) {
    //   request = request.clone({
    //     setHeaders: { Authorization: `Bearer ${token}` }
    //   });
    // }


    //   if (req.headers.get('No-Auth') === 'True') {
    //     return next.handle(req.clone());
    //   }

    //   const token = this.userAuthService.getToken();

    //   req = this.addToken(req, token);

    //   return next.handle(req).pipe(
    //       catchError(
    //           (err:HttpErrorResponse) => {
    //               console.log(err.status);
    //               if(err.status === 401) {
    //                   this.router.navigate(['/login']);
    //               } else if(err.status === 403) {
    //                   this.router.navigate(['/forbidden']);
    //               }
    //               return throwError("Some thing is wrong");
    //           }
    //       )
    //   );
    // }


    // private addToken(request:HttpRequest<any>, token:string) {
    //     return request.clone(
    //         {
    //             setHeaders: {
    //                 Authorization : `Bearer ${token}`
    //             }
    //         }
    //     );
    // }



    const user = this.authService.userValue.user;
    const token = this.authService.userValue.token
    const isLoggedIn = user && token;
    const isApiUrl = request.url.startsWith(environment.apiUrl);

    if (isLoggedIn && isApiUrl) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${user.token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err) => {
        if (err instanceof HttpErrorResponse) {
          console.log(err.url);
          if (err.status === 401 || err.status === 403) {
            if (this.router.url === '/') {

            } else {
              // localStorage.clear();
              this.router.navigate(['/']);
            }
          }
        }
        return throwError(err);
      })
    );
  }
}
