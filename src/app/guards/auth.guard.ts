import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { NotificationService } from '../services/notification.service';
import jwt_decode from 'jwt-decode';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private userService: UserService,
    private router: Router,
    private notificationService: NotificationService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    const token = localStorage.getItem('token');
    console.log('token: ', token)

    if (token != null) {
      const role: any = route.data['roles'] as Array<string>;
      console.log('role: ', role)

      if (role) {
        const match = this.userService.roleMatch(role);
        console.log('match: ', match)

        if (match) {
          return true;
        } else {
          this.router.navigate(['/forbidden']);
          return false;
        }
      }
    }

    this.router.navigate(['/login']);
    return false;

    // let expectedRoleArray = route.data;
    // expectedRoleArray = expectedRoleArray['expectedRole'];

    // const token: any = localStorage.getItem('token');

    // var tokenPayLoad: any;
    // try {
    //   tokenPayLoad = jwt_decode(token);
    // } catch (error) {
    //   localStorage.clear();
    //   this.router.navigate(['/']);
    // }

    // let expectedRole = '';

    // for (let i = 0; i < expectedRoleArray['length']; i++) {
    //   if (expectedRoleArray[i] == tokenPayLoad.role) {
    //     expectedRole = tokenPayLoad.role;
    //   }
    // }

    // if (tokenPayLoad.role == 'USER' || tokenPayLoad.role == 'ADMIN') {
    //   console.log('token-role: ', tokenPayLoad)
    //   console.log('current user: ', this.authService.userValue)
    //   if (this.authService.userValue && tokenPayLoad.role == expectedRole) {
    //     return true;
    //   }
    //   this.notificationService.showError("You are not authorized", "UNAUTHORIZED");
    //   // this.router.navigate(['/admin-dashboard']);
    //   return false;
    // } else {
    //   this.router.navigate(['']);
    //   localStorage.clear();
    //   return false;
    // }
  }

}

