import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    let expectedRoleArray = route.data;
    expectedRoleArray = expectedRoleArray['expectedRole'];

    const token: any = localStorage.getItem('token');

    var tokenPayLoad: any;
    try {
      tokenPayLoad = jwt_decode(token);
      console.log("token-role: ", tokenPayLoad.role)
    } catch (error) {
      localStorage.clear();
      this.router.navigate(['/']);
    }

    let expectedRole = '';

    for (let i = 0; i < expectedRoleArray['length']; i++) {
      if (expectedRoleArray[i] == tokenPayLoad.role) {
        expectedRole = tokenPayLoad.role;
      }
    }

    if (tokenPayLoad.role == 'USER' || tokenPayLoad.role == 'ADMIN') {
      if (this.authService.isAuthenticated() && tokenPayLoad.role == expectedRole) {
        return true;
      }
      this.notificationService.showError("You are not authorized", "UNAUTHORIZED");
      // if (tokenPayLoad.role == 'USER') {
      //   this.router.navigate(['/user-dashboard']);
      // } else {
      //   this.router.navigate(['/admin-dashboard']);
      // }
      return false;
    } else {
      this.router.navigate(['']);
      localStorage.clear();
      return false;
    }
  }

}

